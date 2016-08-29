import { Component, h } from '../../lib';

export class AttrReflectionApp extends Component {
  get config() {
    return {
      template: state => h('.attr-app', [
        h('p', `Value of attribute wombats: ${this.getAttribute('wombats')}`),
      ]),
    };
  }
}
