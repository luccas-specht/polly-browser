const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    personas: './src/ui/pages/personas/index.html',
    personaDetails: './src/ui/pages/personaDetails/index.html',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.png$/i, ///\.(png|jpe?g|gif)$/i
        type: 'asset/resource',
        generator: {
          filename: 'assets/image/[name][ext]', // Gera imagens, icons, svg... na pasta dist/assets/image/
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/svg/[name].svg',
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: ['src/**/*.html', 'src/**/*.css'],
    liveReload: true,
    client: {
      progress: false,
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/personas.html' },
        { from: /^\/personas$/, to: '/personas.html' },
        { from: /^\/persona-details$/, to: '/personaDetails.html' },
      ],
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui/pages/personas/index.html',
      filename: 'personas.html',
      chunks: ['personas'],
    }),
    new HtmlWebpackPlugin({
      template: './src/ui/pages/personaDetails/index.html',
      filename: 'personaDetails.html',
      chunks: ['personaDetails'],
    }),
    new MiniCssExtractPlugin(),
  ],
};
