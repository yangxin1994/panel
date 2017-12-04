import { Component, h } from '../../lib';

export class NestedPartialStateParent extends Component {
  get config() {
    return {
      defaultState: {
        title: `test`,
        nonSharedStateExample: `I am parent`,
        parentOnlyState: `hello`,
      },

      template: state => h(`div`, {class: {'nested-partial-parent': true}}, [
        h(`h1`, `Nested partial shared state app title: ${state.title}`),
        h(`p`, `parent: parentOnlyState: ${state.parentOnlyState}`),
        this.child(`nested-partial-state-child`),
      ]),
    };
  }
}

export class NestedPartialStateChild extends Component {
  get config() {
    return {
      sharedStateKeys: [`title`],
      defaultState: {
        nonSharedStateExample: `I am child`,
        childOnlyState: `world`,
      },

      template: state => h(`div`, {class: {'nested-partial-child': true}}, [
        h(`p`, `shared title: ${state.title}`),
        h(`p`, `childOnlyState: ${state.childOnlyState}`),
        h(`p`, `child: parentOnlyState: ${state.parentOnlyState}`),
      ]),
    };
  }
}
