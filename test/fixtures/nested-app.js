import { Component } from '../../lib';
import h from 'virtual-dom/virtual-hyperscript';

document.registerElement('nested-app', class extends Component {
  get config() {
    return {
      defaultState: {
        title: 'test',
      },

      template: state => h('.nested-foo', [
        h('h1', `Nested app: ${state.title}`),
        this.child('nested-child', {attributes: {'state-animal': 'llama'}}),
      ]),
    };
  }
});

document.registerElement('nested-child', class extends Component {
  get config() {
    return {
      template: state => h('.nested-foo-child', [
        h('p', `parent title: ${state.title}`),
        h('p', `animal: ${state.animal}`),
      ]),
    };
  }
});
