import { Component, h } from '../../lib';

export class ShadowDomApp extends Component {
  get config() {
    return {
      css: 'color: blue;',

      template: state => h('.foo', [
        h('p', `Hello`),
      ]),

      useShadowDom: true,
    };
  }
}
