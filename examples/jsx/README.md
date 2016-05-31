# Using JSX with Panel

The example in this directory notates the basic 'counter app' from the [README](https://github.com/mixpanel/panel/blob/master/README.md) but using [JSX](https://facebook.github.io/jsx/) to inline the template:
```jsx
document.registerElement('counter-app', class extends Component {
  get config() {
    return {
      defaultState: {count: 1},

      helpers: {
        decr: () => this.changeCounter(-1),
        incr: () => this.changeCounter(1),
      },

      template: props =>
        <div className="counter">
          <div className="val">
            Counter: {props.count}
          </div>
          <div className="controls">
            <button className="decr" onclick={props.$helpers.decr}>-</button>
            <button className="incr" onclick={props.$helpers.incr}>+</button>
          </div>
        </div>
    };
  }

  changeCounter(offset) {
    this.update({count: this.state.count + offset});
  }
});
```

To install and run the example from this directory: `npm install && npm start`. The page will be served on `localhost:8080` by Webpack dev server.

### Notes

For transpiling JSX to JavaScript, this example uses the standard Babel plugin [transform-react-jsx](https://babeljs.io/docs/plugins/transform-react-jsx/). In order for the plugin's output to interface correctly with `virtual-dom` instead of `React`, a wrapper around the Hyperscript `h` function is provided in `jsx-h.js`. See the discussion in the Babel issue ["Use Array for JSX Children."](https://phabricator.babeljs.io/T2034) Other tools such as [jsx-transform](https://github.com/alexmingoia/jsx-transform), [babel-plugin-jsx-factory](https://github.com/substack/babel-plugin-jsx-factory), or [jsx-webpack-loader](https://www.npmjs.com/package/jsx-webpack-loader) may also provide similar functionality.
