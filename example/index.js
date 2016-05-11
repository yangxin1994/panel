import 'webcomponents.js'; // polyfill

import { Component } from '../lib';

import template from './app.jade';
import aboutTemplate from './about.jade';
import counterTemplate from './counter.jade';

document.registerElement('counter-app', class extends Component {
  get $defaultState() {
    return {
      $view: 'about',
      count: 1,
    };
  }

  get $routes() {
    return {
      'counter': () => ({$view: 'counter'}),
      'about':   () => ({$view: 'about'}),
      '':        'about',
    };
  }

  get $template() {
    return template;
  }
});

document.registerElement('about-view', class extends Component {
  get $template() {
    return aboutTemplate;
  }
});

document.registerElement('counter-view', class extends Component {
  get $template() {
    return counterTemplate;
  }

  get handlers() {
    return {
      decr: () => this.changeCounter(-1),
      incr: () => this.changeCounter(1),
    };
  }

  changeCounter(offset) {
    this.update({count: this.state.count + offset});
  }
});
