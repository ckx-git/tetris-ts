const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve('./dist'),
    filename: 'script/bundle.js'
  },
  // devServer: {
  //   contentBase: './dist',
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
      // { 
      //   test: /\.ts$/, use: {
      //     loader: 'ts-loader',
      //     options: {
      //       transpileOnly: true
      //     }
      //   }
      // }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}