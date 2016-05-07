var path = require('path');

var webpackConfig = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    filename: path.join(__dirname, 'build.js'),
  },
  module: {
    loaders: [
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
};

module.exports = webpackConfig;
