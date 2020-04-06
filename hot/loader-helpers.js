/* eslint-env commonjs */
const loaderUtils = require(`loader-utils`);
const path = require(`path`);
const validateOptions = require(`schema-utils`);

const OPTIONS_SCHEMA = {
  type: `object`,
  properties: {
    hot: {
      type: `boolean`,
    },
  },
};

// Retrieve elemName for hot injection from path convention
//
// elem name patterns look like this
//    ./src/.../${elemName}/index.<ext>
//    ./src/.../${elemName}/template.<ext>
//    ./src/.../${elemName}/style.<ext> or styles.<ext>
//    ./src/.../${elemName}/controller.<ext>
// OR ./src/.../${elemName}.<ext>
//
// this means multiple element definitions in a single file won't work

module.exports.getElemName = function (resourcePath, options) {
  const pathInfo = path.parse(resourcePath);
  let elemName = pathInfo.name;
  if (/^(index|template|styles?|controller)$/.test(pathInfo.name)) {
    const pathParts = resourcePath.split(`/`);
    elemName = pathParts[pathParts.length - 2];
  }

  const transform = options.elementNameTransform;
  if (typeof transform === `function`) {
    elemName = transform(elemName, resourcePath);
  }

  return elemName;
};

module.exports.getOptions = function (context) {
  const options = loaderUtils.getOptions(context) || {};

  validateOptions(OPTIONS_SCHEMA, options, `Panel HMR`);

  return options;
};
