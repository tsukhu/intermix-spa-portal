const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const activeEnv = process.env.STAGE_ENV || 'development';

require('dotenv').config({
  path: `.env.${activeEnv}`,
});


module.exports = env => ({
  entry: path.resolve(__dirname, 'src/root-config'),
  output: {
    filename: 'root-config.js',
    libraryTarget: 'system',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'sourcemap',
  module: {
    rules: [
      { parser: { system: false } },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.ejs',
      templateParameters: {
        isLocal: env && env.isLocal === 'true',
        importConfigUrl: JSON.stringify(`${process.env.IMPORT_CONFIG_URL}`)
      },
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      __IMPORT_CONFIG_URL__: JSON.stringify(`${process.env.IMPORT_CONFIG_URL}`),
      __ROUTES_API_URL__: JSON.stringify(`${process.env.ROUTES_API_URL}`),
    }),
  ],
  externals: ['single-spa', /^@intermix\/.+$/],
});
