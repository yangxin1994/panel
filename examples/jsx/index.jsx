import 'webcomponents.js'; // polyfill

// import from the same repo. in a different repo you'd use:
// import { Component } from 'panel';
import { Component } from '../../lib';
import { html } from 'snabbdom-jsx';

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
            <button className="decr" on-click={props.$helpers.decr}>-</button>
            <button className="incr" on-click={props.$helpers.incr}>+</button>
          </div>
        </div>
    };
  }

  changeCounter(offset) {
    this.update({count: this.state.count + offset});
  }
});
