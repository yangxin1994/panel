import {Component, h} from '../../lib';

export class InsertHookWithoutKey extends Component {
  get config() {
    return {
      template: () =>
        h(
          `div`,
          {
            hook: {
              insert: () => (this.insertHookCalled = true),
            },
          },
          [h(`p`, `Hello`)],
        ),
    };
  }
}

export class InsertHookWithKey extends Component {
  get config() {
    return {
      template: () =>
        h(
          `div`,
          {
            // because of the key, Snabbdom will create a new element
            // rather than patching Panel's existing root element in
            // place
            key: `foobar`,
            hook: {
              insert: () => (this.insertHookCalled = true),
            },
          },
          [h(`p`, `Hello I'm in a keyed root element`)],
        ),
    };
  }
}
