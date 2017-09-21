# Using ControlledComponent and StateController

The example in this directory recreates the basic 'counter app' from the [README](https://github.com/mixpanel/panel/blob/master/README.md), but uses an explicit StateController

```js
class CounterController extends StateController {
  get defaultState() {
    return {
      count: 0,
    };
  }

  incrCounter() {
    const count = this.state.count + 1;
    this._update({count});
  }

  decrCounter() {
    const count = this.state.count - 1;
    this._update({count});
  }

  getCount() {
    return this.state.count;
  }
}

document.registerElement(`counter-app`, class extends ControlledComponent {
  get config() {
    return {
      controller: new CounterController(),
      template: () => h(`div.counter`, [
        h(`div.val`, `Counter: ${this.controller.getCount()}`),
        h(`div.controls`, [
          h(`button.decr`, {on: {click: () => this.controller.decrCounter()}}, `-`),
          h(`button.incr`, {on: {click: () => this.controller.incrCounter()}}, `+`),
        ]),
      ]),
    };
  }
});

```

To install and run the example from this directory: `npm install && npm start`. The page will be served on `localhost:8080` by Webpack dev server.
