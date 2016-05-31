import 'webcomponents.js'; // polyfill

import { Component } from '../lib';
import h from './jsx-h';

document.registerElement('counter-app', class extends Component {
  get config() {
    return {
      defaultState: {count: 1},

      helpers: {
        decr: () => this.changeCounter(-1),
        incr: () => this.changeCounter(1),
      },

      template: props =>
        <div className="counter">
          <div className="val">
            Counter: {props.count}
          </div>
          <div className="controls">
            <button className="decr" onclick={props.$helpers.decr}>-</button>
            <button className="incr" onclick={props.$helpers.incr}>+</button>
          </div>
        </div>
    };
  }

  changeCounter(offset) {
    this.update({count: this.state.count + offset});
  }
});
