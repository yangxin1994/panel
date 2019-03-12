var HtmlWebpackPlugin = require(`html-webpack-plugin`);

var webpackConfig = {
  entry: `./index.tsx`,
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: `babel-loader`,
            options: {
              plugins: [
                [`transform-react-jsx`, {pragma: `Snabbdom.createElement`}],
              ],
              presets: [
                [
                  `@babel/preset-env`,
                  {
                    "targets": {
                      "node": true,
                    },
                  },
                ],
              ],
            },
          }, {
            loader: `ts-loader`,
            options: {
              compilerOptions: {
                jsx: `preserve`,
                module: `es2015`,
                target: `es2015`,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: `head`,
      template: `index.template.html`,
    }),
  ],
};

module.exports = webpackConfig;
