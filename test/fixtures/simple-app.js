import { Component, h } from '../../lib';

export class SimpleApp extends Component {
  get config() {
    return {
      defaultState: {
        foo: 'bar',
      },

      helpers: {
        capitalize: s => s[0].toUpperCase() + s.slice(1),
      },

      template: state => h('div', {class: {foo: true}}, [
        h('p', `Value of foo: ${state.foo}`),
        h('p', `Foo capitalized: ${state.$helpers.capitalize(state.foo)}`),
      ]),
    };
  }

  shouldUpdate(state) {
    // I simply refuse to say "Value of foo: meow"
    return state.foo !== 'meow';
  }
}
