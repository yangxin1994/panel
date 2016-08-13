import { Component, h } from '../../lib';

export class BreakableApp extends Component {
  get config() {
    return {
      template: state => h('.foo', [
        // this will throw if state.foo does not exist
        h('p', `Value of foo.bar: ${state.foo.bar}`),
      ]),
    };
  }
}
