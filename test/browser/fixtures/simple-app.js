import { Component, h } from '../../../lib';

document.registerElement('simple-app', class extends Component {
  get config() {
    return {
      defaultState: {
        foo: 'bar',
      },

      helpers: {
        capitalize: s => s[0].toUpperCase() + s.slice(1),
      },

      template: state => h('.foo', [
        h('p', `Value of foo: ${state.foo}`),
        h('p', `Foo capitalized: ${state.$helpers.capitalize(state.foo)}`),
      ]),
    };
  }

  shouldUpdate(state) {
    // I simply refuse to say "Value of foo: meow"
    return state.foo !== 'meow';
  }
});
