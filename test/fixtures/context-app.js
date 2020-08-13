import {Component, h} from '../../lib';
import {ContextAlphaImpl, ContextAlphaAltImpl, ContextBravoImpl} from './simple-contexts';

export class ContextAlphaWidget extends Component {
  get config() {
    return {
      template: () => h(`div`, {class: {foo: true}}),
      attachedContexts: [`alpha`],
    };
  }
}

export class ImmediateContextParent extends Component {
  get config() {
    return {
      template: () => h(`context-alpha-widget`, {class: {foo: true}}),
      defaultContexts: {alpha: new ContextAlphaImpl(`immediate-parent-alpha`)},
    };
  }
}

export class ImmediateContextParentWithWrapper extends Component {
  get config() {
    return {
      template: () =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`div`, {class: {foo: true}}, [h(`div`, {class: {foo: true}}, [h(`context-alpha-widget`)]), h(`p`, `asdf`)]),
          h(`p`, `asdf`),
        ]),
      defaultContexts: {alpha: new ContextAlphaImpl(`immediate-parent-alpha-with-wrapper`)},
    };
  }
}

export class ShadowDomContextParent extends Component {
  get config() {
    return {
      template: () =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`div`, {class: {foo: true}}, [h(`div`, {class: {foo: true}}, [h(`context-alpha-widget`)]), h(`p`, `asdf`)]),
          h(`p`, `asdf`),
        ]),
      defaultContexts: {alpha: new ContextAlphaImpl(`shadow-dom-parent-alpha`)},
      useShadowDom: true,
    };
  }
}

export class ContextAlphaSlottedWidget extends Component {
  get config() {
    return {
      template: () => h(`slot`),
      defaultContexts: {alpha: new ContextAlphaImpl(`slotted-alpha`)},
    };
  }
}

export class ContextAlphaAltSlottedWidget extends Component {
  get config() {
    return {
      template: () => h(`slot`),
      defaultContexts: {alpha: new ContextAlphaAltImpl()},
    };
  }
}

export class NestedSlottedContextWidgets extends Component {
  get config() {
    return {
      template: () =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`context-alpha-slotted-widget`, {class: {foo: true}}, [
            h(`span`, {class: {foo: true}}, [
              h(`context-alpha-alt-slotted-widget`, {class: {foo: true}}, [h(`context-alpha-widget`)]),
            ]),
            h(`p`, `asdf`),
          ]),
          h(`p`, `asdf`),
        ]),
    };
  }
}

export class ContextGrandparent extends Component {
  get config() {
    return {
      template: () => h(`immediate-context-parent`, {class: {foo: true}}),
      defaultContexts: {alpha: new ContextAlphaImpl(`grandparent-alpha`)},
    };
  }
}

export class ContextBravoWidget extends Component {
  get config() {
    return {
      template: () => h(`div`, {class: {foo: true}}),
      attachedContexts: [`bravo`],
    };
  }
}

export class ContextBravoParentWithNestedAlphaWidgets extends Component {
  get config() {
    return {
      template: () =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`context-alpha-slotted-widget`, {class: {foo: true}}, [
            h(`span`, {class: {foo: true}}, [
              h(`context-alpha-alt-slotted-widget`, {class: {foo: true}}, [
                h(`context-alpha-widget`),
                h(`context-bravo-widget`),
              ]),
            ]),
            h(`p`, `asdf`),
          ]),
          h(`p`, `asdf`),
        ]),
      defaultContexts: {bravo: new ContextBravoImpl(`parent-bravo`)},
    };
  }
}

export class ContextlessSlottedWrapper extends Component {
  get config() {
    return {
      template: () => h(`slot`),
    };
  }
}

export class ContextParentWithContextlessSlottedWrapper extends Component {
  get config() {
    return {
      template: () =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`contextless-slotted-wrapper`, {class: {foo: true}}, [h(`context-alpha-widget`)]),
          h(`p`, `asdf`),
        ]),
      defaultContexts: {alpha: new ContextAlphaImpl(`parent-alpha`)},
    };
  }
}

export class ContextlessComponentWrapper extends Component {
  get config() {
    return {
      template: () => h(`context-alpha-widget`),
    };
  }
}

export class ContextParentWithContextlessComponentWrapper extends Component {
  get config() {
    return {
      template: () => h(`div`, {class: {foo: true}}, [h(`contextless-component-wrapper`)]),
      defaultContexts: {alpha: new ContextAlphaImpl(`parent-alpha`)},
    };
  }
}
