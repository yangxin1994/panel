// import from the same repo. in a different repo you'd use:
// import { Component, h } from 'panel';
import {Component, h} from '../../lib';

import {createStore} from 'redux';

// action creators
const incrCounter = () => ({type: 'INCREMENT'});
const decrCounter = () => ({type: 'DECREMENT'});

// reducer
const reducer = (state = {count: 1}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, {count: state.count + 1});
    case 'DECREMENT':
      return Object.assign({}, state, {count: state.count - 1});
    default:
      return state;
  }
};

const store = createStore(reducer);

customElements.define(
  'counter-app',
  class extends Component {
    get config() {
      return {
        defaultState: store.getState(),

        template: (props) =>
          h('div.counter', [
            h('div.val', `Counter: ${props.count}`),
            h('div.controls', [
              h('button.decr', {on: {click: () => store.dispatch(decrCounter())}}, '-'),
              h('button.incr', {on: {click: () => store.dispatch(incrCounter())}}, '+'),
            ]),
          ]),
      };
    }
  },
);

const counterApp = document.querySelector('counter-app');
store.subscribe(() => counterApp.update(store.getState()));
