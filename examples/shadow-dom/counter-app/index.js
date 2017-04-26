// import from the same repo. in a different repo you'd use:
// import { Component } from 'panel';
import { Component } from '../../../lib';

import './about-view';
import './counter-view';

import template from './index.jade';
import css from './index.styl';

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
      css,
      useShadowDom: true,
    };
  }
});
