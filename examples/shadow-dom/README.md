# Using Shadow DOM in Panel components

A Panel component can be configured to use a [Shadow DOM](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom) tree rather than a plain Custom Element, for better encapsulation of styles and events.

To configure a component to use Shadow DOM, set `useShadowDom` in its `config` object:
```js
customElements.define('counter-view', class extends Component {
  get config() {
    return {
      // ...

      useShadowDom: true,

    };
  }

  // ...
});
```

To specify component-scoped styles, pass any valid CSS string in the `css` entry of `config`:
```js
get config() {
  return {
    // ...

    useShadowDom: true,
    css: 'p {color: red}',

  };
}
```

In practice, building CSS via raw string concatenation is fragile and impractical, and so the example in this directory imports generated CSS strings from separate modules via Webpack. The example compiles CSS from [Stylus](http://stylus-lang.com/) source, but raw CSS, SCSS, Sass, or any other language with an available Webpack loader will work:
```js
import css from './index.styl';

customElements.define('counter-view', class extends Component {
  get config() {
    return {
      // ...

      useShadowDom: true,
      css,

    };
  }

  // ...
});
```

To install and run the example from this directory: `npm install && npm start`. The page will be served on `localhost:8080` by Webpack dev server.

### Notes

- Panel uses the Shadow DOM v1 API, which behaves similarly to the v0 API. See the description in Eric Bidelman's [Shadow DOM v1: Self-Contained Web Components](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom).
- In order to work in browsers which don't yet natively implement Shadow DOM v1 (such as Firefox as of April 2017), the example uses the [ShadyDOM polyfill](https://github.com/webcomponents/shadydom).
- The structure of the example demonstrates a recommended directory layout for non-trivial applications: each component receives its own directory, including `index` files for code (`.js`), template (`.jade`), and stylesheet (`.styl`). Nested subcomponents are placed in subdirectories under the parent component (`about-view` and `counter-view` are subdirectories of `counter-app`), so that the directory structure mirrors the large-scale DOM structure of the full application.
