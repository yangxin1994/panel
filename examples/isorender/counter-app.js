// import from the same repo. in a different repo you'd use:
// import { Component } from 'panel';
import { Component } from '../../lib';

import template from './counter-app.jade';

document.registerElement('counter-app', class extends Component {
  get config() {
    return {
      defaultState: {
        count: 1,
      },

      template,
    };
  }
});
