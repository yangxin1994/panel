import {Component, h} from '../../lib';

export class NestedApp extends Component {
  get config() {
    return {
      defaultState: {
        title: `test`,
      },

      hooks: {
        preUpdate: () => this.nestedPreTitle = this.state.title,
        postUpdate: () => this.nestedPostTitle = this.state.title,
      },

      template: state => h(`div`, {class: {'nested-foo': true}}, [
        h(`h1`, `Nested app: ${state.title}`),
        this.child(`nested-child`, {attrs: {'child-title': `test`, 'state-animal': `llama`}}),
      ]),
    };
  }
}

export class NestedChild extends Component {
  static get attrsSchema() {
    return {'animal': `string`};
  }

  get config() {
    return {
      template: state => h(`div`, {class: {'nested-foo-child': true}}, [
        h(`p`, `parent title: ${state.title}`),
        h(`p`, `animal: ${state.animal}`),
      ]),
    };
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    if (attr === `animal`) {
      this.update({animal: newVal});
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.update({stateFromChild: `value`});
  }
}
