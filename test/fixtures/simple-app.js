import { Component } from '../../lib';
import h from 'virtual-dom/virtual-hyperscript';

document.registerElement('simple-app', class extends Component {
  get $defaultState() {
    return {
      foo: 'bar',
    };
  }

  get $helpers() {
    return {
      capitalize: s => s[0].toUpperCase() + s.slice(1),
    };
  }

  get $template() {
    return state => h('.foo', [
      h('p', `Value of foo: ${state.foo}`),
      h('p', `Foo capitalized: ${state.$helpers.capitalize(state.foo)}`),
    ]);
  }
});
