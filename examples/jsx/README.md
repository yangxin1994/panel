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
            <button className="decr" on-click={props.$helpers.decr}>-</button>
            <button className="incr" on-click={props.$helpers.incr}>+</button>
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

For transpiling JSX to JavaScript, this example uses the standard Babel plugin [transform-react-jsx](https://babeljs.io/docs/plugins/transform-react-jsx/). In order for the plugin's output to interface correctly with `snabbdom` instead of `React`, we use the [`snabbdom-jsx`](https://github.com/yelouafi/snabbdom-jsx) package and configure the Babel plugin to use the `html` Hyperscript function provided by `snabbdom-jsx`.

Information on integrating Snabbdom-specific functionality (such as its dynamic class-toggling system) into JSX code can be found in [Mapping JSX attributes](https://github.com/yelouafi/snabbdom-jsx#mapping-jsx-attributes) from the `snabbdom-jsx` README.
