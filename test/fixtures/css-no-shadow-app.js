import { Component, h } from '../../lib';

export class CssNoShadowApp extends Component {
  get config() {
    return {
      css: 'color: blue;',

      template: state => h('.foo', [
        h('p', `Hello`),
      ]),
    };
  }
}
