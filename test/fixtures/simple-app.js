import {Component} from '../../lib';
import h from 'virtual-dom/virtual-hyperscript';

document.registerElement('simple-app', class extends Component {
  get $defaultState() {
    return {
      foo: 'bar',
    };
  }

  get $template() {
    return state => h('.foo', `Value of foo: ${state.foo}`);
  }
});
