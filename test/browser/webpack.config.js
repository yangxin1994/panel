/* eslint-env node */
const path = require(`path`);

const webpackConfig = {
  entry: path.join(__dirname, `index.js`),
  output: {
    path: path.join(__dirname, `build`),
    filename: `bundle.js`,
    pathinfo: true,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: `babel`,
        query: {
          plugins: [
            `syntax-async-functions`,
            `transform-regenerator`,
          ],
          presets: [`es2015`],
        },
      },
      {
        test: /\.js$/,
        include: /domsuite/,
        loader: `babel`,
        query: {
          plugins: [
            `syntax-async-functions`,
            `transform-regenerator`,
          ],
          presets: [`es2015`],
        },
      },
    ],
  },
  watch: process.env.WATCH,
};

module.exports = webpackConfig;
