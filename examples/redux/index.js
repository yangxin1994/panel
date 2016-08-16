import 'webcomponents.js'; // polyfill

// import from the same repo. in a different repo you'd use:
// import { Component } from 'panel';
import { Component } from '../../lib';

import { createStore } from 'redux';
import h from 'virtual-dom/virtual-hyperscript';

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
