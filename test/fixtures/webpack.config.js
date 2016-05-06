var path = require('path');

var webpackConfig = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    filename: 'build.js',
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
  resolveLoader: {
    root: path.join(__dirname, '../../node_modules'),
  },
};

module.exports = webpackConfig;
