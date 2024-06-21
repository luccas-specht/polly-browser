import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { Polly, DescribeVoicesCommand } from '@aws-sdk/client-polly';
import { getSynthesizeSpeechUrl } from '@aws-sdk/polly-request-presigner';

export const client = new Polly({
  region: 'us-east-2',
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: 'us-east-2' }),
    identityPoolId: 'us-east-2:89799f06-a100-48f8-aa5d-8aa5558465f0',
  }),
});

export async function createPreviousURLAudio(speechParams) {
  console.log({ speechParams });

  try {
    const url = await getSynthesizeSpeechUrl({
      client,
      params: speechParams,
    });

    const command = new DescribeVoicesCommand({
      // DescribeVoicesInput
      //LanguageCode: 'en-AU',
      IncludeAdditionalLanguageCodes: true,
    });
    const response = await client.send(command);

    const filteredVoices = response.Voices.filter((voice) =>
      voice.LanguageCode.startsWith('en')
    );
    console.log({ filteredVoices, response });
    document.getElementById('audioSource').src = url;
    document.getElementById('audioPlayback').load();
  } catch (err) {
    console.log('Error', err);
  }
}
