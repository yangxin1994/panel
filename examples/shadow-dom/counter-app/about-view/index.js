// import from the same repo. in a different repo you'd use:
// import { Component } from 'panel';
import {Component} from '../../../../lib';

import template from './index.jade';
import css from './index.styl';

customElements.define(
  `about-view`,
  class extends Component {
    get config() {
      return {
        template,
        css,
        useShadowDom: true,
      };
    }
  },
);
