# Using Redux with Panel

The example in this directory recreates the basic 'counter app' from the [README](https://github.com/mixpanel/panel/blob/master/README.md), but models the state interactions with the store/dispatch system of [Redux](http://redux.js.org/):

```js
// action creators
const incrCounter = () => ({type: 'INCREMENT'});
const decrCounter = () => ({type: 'DECREMENT'});

// reducer
const reducer = (state={count: 1}, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, {count: state.count + 1});
    case 'DECREMENT':
      return Object.assign({}, state, {count: state.count - 1});
    default:
      return state;
  }
}

const store = createStore(reducer);

document.registerElement('counter-app', class extends Component {
  get config() {
    return {
      defaultState: store.getState(),

      template: props => h('.counter', [
        h('.val', `Counter: ${props.count}`),
        h('.controls', [
          h('button.decr', {onclick: () => store.dispatch(decrCounter())}, '-'),
          h('button.incr', {onclick: () => store.dispatch(incrCounter())}, '+'),
        ]),
      ]),
    };
  }
});

const counterApp = document.querySelector('counter-app');
store.subscribe(() => counterApp.update(store.getState()));
```

The `store.subscribe()` call at the bottom ensures that any dispatched actions will propagate the resulting `state` to the Panel app.

To install and run the example from this directory: `npm install && npm start`. The page will be served on `localhost:8080` by Webpack dev server.
