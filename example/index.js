import 'webcomponents.js';

import {Component} from '../lib';
import h from 'virtual-dom/virtual-hyperscript';

document.registerElement('counter-app', class extends Component {
  get $defaultState() {
    return {
      $view: 'about',
    };
  }

  get $routes() {
    return {
      'counter': () => ({$view: 'counter'}),
      'about':   () => ({$view: 'about'}),
      '':        'about',
    };
  }

  $template(state) {
    return h('.app', [
      h('.header', [
        h('a', {href: '#about'},   'About'  ),
        h('a', {href: '#counter'}, 'Counter'),
      ]),
      this.child('view-about'),
      this.child('view-counter'),
    ]);
  }
});

document.registerElement('view-about', class extends Component {
  $template() {
    return h('.about', 'This is a sample app.');
  }

  get $view() {
    return 'about';
  }
});

document.registerElement('view-counter', class extends Component {
  get $defaultState() {
    return {
      count: 5,
    };
  }

  $template(state) {
    return h('.counter', [
      h('.val', `Counter: ${state.count}`),
      h('button.decr', {onclick: () => this.updateCount(-1)}, '-'),
      h('button.incr', {onclick: () => this.updateCount(1) }, '+'),
    ]);
  }

  get $view() {
    return 'counter';
  }

  updateCount(offset) {
    this.update({count: this.state.count + offset});
  }
});
