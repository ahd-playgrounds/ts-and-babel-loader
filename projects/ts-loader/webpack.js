const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = __dirname;

module.exports = (_, options = {}) => ({
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser'],
    // alias: {
    //   ...shared,
    // },
  },
  entry: path.resolve(rootPath, 'src', 'App.tsx'),
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(rootPath, 'build'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    host: '0.0.0.0',
    port: 4000,
    publicPath: '/',
  },
  output: {
    path: path.resolve(rootPath, 'build'),
    filename: 'js/[name].js',
    publicPath: './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'babel-loader',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0',
      },
    }),
  ],
});