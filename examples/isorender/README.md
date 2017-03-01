# Rendering Panel components server-side

The example in this directory demonstrates rendering a simple 'counter' app without a browser, running instead in Node.js and outputting HTML to the terminal. It uses Jade templating, showing how to use a Babel plugin to load `virtual-jade` without Webpack or any bundling/precompiling (see `.babelrc`). It also updates app state programmatically and then re-renders with different output.

### Usage

- Install dependencies: `npm install`
- Run rendering script: `npm start` (initial startup may require some time for Babel compilation)

### Notes

The rendering script in `index.js` relies on Babel in a number of ways:

- transpiling ES2015
- compiling Jade to JS virtual-hyperscript functions
- enabling ES2017 `async/await` syntax

`async/await` is used here only to clean up the syntax of waiting for `requestAnimationFrame` between app updates; it is not required for server-side rendering. Likewise, apps which don't use Jade don't need `babel-plugin-virtual-jade`.
