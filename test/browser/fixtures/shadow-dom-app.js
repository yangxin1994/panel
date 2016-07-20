import { Component, h } from '../../../lib';

var ShadowDomApp = document.registerElement('shadow-dom-app', class extends Component {
  get config() {
    return {
      css: 'color: blue;',

      template: state => h('.foo', [
        h('p', `Hello`),
      ]),

      useShadowDom: true,
    };
  }
});
