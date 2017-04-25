// import from the same repo. in a different repo you'd use:
// import { Component } from 'panel';
import { Component } from '../../lib';

import template from './app.jade';
import aboutTemplate from './about.jade';
import counterTemplate from './counter.jade';

import './index.styl';

customElements.define('counter-app', class extends Component {
  get config() {
    return {
      defaultState: {
        $view: 'about',
        count: 1,
      },

      routes: {
        'counter': () => ({$view: 'counter'}),
        'about':   () => ({$view: 'about'}),
        '':        'about',
      },

      template,
    };
  }
});

customElements.define('about-view', class extends Component {
  get config() {
    return {template: aboutTemplate};
  }
});

customElements.define('counter-view', class extends Component {
  get config() {
    return {
      helpers: {
        decr: () => this.changeCounter(-1),
        incr: () => this.changeCounter(1),
      },

      template: counterTemplate,
    };
  }

  changeCounter(offset) {
    this.update({count: this.state.count + offset});
  }
});
