/* eslint-env node */
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const path = require(`path`);

const webpackConfig = {
  entry: `./index.js`,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: `babel`,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `index.template.html`,
    }),
  ],
  resolveLoader: {
    root: path.join(__dirname, `node_modules`),
  },
};

module.exports = webpackConfig;
