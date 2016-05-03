import 'webcomponents.js'; // polyfill

import {Component} from '../lib';
import h from 'virtual-dom/virtual-hyperscript';

import aboutTemplate from './about.jade';
import appTemplate from './app.jade';
import counterTemplate from './counter.jade';

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

  get $template() {
    return appTemplate;
  }
});

document.registerElement('view-about', class extends Component {
  get $template() {
    return aboutTemplate;
  }
});

document.registerElement('view-counter', class extends Component {
  get $defaultState() {
    return {
      count: 5,
    };
  }

  get $template() {
    return counterTemplate;
  }

  get handlers() {
    return {
      decr: () => this.update({count: this.state.count - 1}),
      incr: () => this.update({count: this.state.count + 1}),
    }
  }
});
