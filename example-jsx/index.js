import 'webcomponents.js'; // polyfill

import { Component } from '../lib';
import h from 'virtual-dom/virtual-hyperscript';

document.registerElement('counter-app', class extends Component {
  get config() {
    return {
      defaultState: {count: 1},

      helpers: {
        decr: () => this.changeCounter(-1),
        incr: () => this.changeCounter(1),
      },

      template: state => h('.counter', [
        h('.val', `Counter: ${state.count}`),
        h('button.decr', {onclick: state.$helpers.decr}, '-'),
        h('button.incr', {onclick: state.$helpers.incr}, '+'),
      ]),
    };
  }

  changeCounter(offset) {
    this.update({count: this.state.count + offset});
  }
});
