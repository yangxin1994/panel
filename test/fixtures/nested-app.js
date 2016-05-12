import { Component } from '../../lib';
import h from 'virtual-dom/virtual-hyperscript';

document.registerElement('nested-app', class extends Component {
  get $defaultState() {
    return {
      title: 'test',
    };
  }

  get $template() {
    return state => h('.nested-foo', [
      h('h1', `Nested app: ${state.title}`),
      this.child('nested-child', {attributes: {'state-animal': 'llama'}}),
    ]);
  }
});

document.registerElement('nested-child', class extends Component {
  get $template() {
    return state => h('.nested-foo-child', [
      h('p', `parent title: ${state.title}`),
      h('p', `animal: ${state.animal}`),
    ]);
  }
});
