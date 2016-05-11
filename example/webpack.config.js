var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var webpackConfig = {
  entry: './index.js',
  module: {
    loaders: [
      {
        test: /\.jade$/,
        exclude: /node_modules/,
        loader: 'virtual-jade',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
            presets: ['es2015'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      template: 'index.template.html',
    }),
  ],
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
};

module.exports = webpackConfig;
