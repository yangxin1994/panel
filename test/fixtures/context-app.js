import {Component, h} from '../../lib';
import {
  ContextAlpha,
  ContextAlphaImpl,
  ContextAlphaAltImpl,
  ContextBravo,
  ContextBravoImpl,
} from './simple-contexts';

export class ContextAlphaWidget extends Component {
  get config() {
    return {
      template: (state) =>
        h(`div`, {class: {foo: true}}),
      defaultContexts: new Map([
        [ContextAlpha, new ContextAlphaImpl(`default-alpha`)],
      ]),
    };
  }
}

export class ImmediateContextParent extends Component {
  get config() {
    return {
      template: (state) =>
        h(`context-alpha-widget`, {class: {foo: true}}),
      defaultContexts: new Map([
        [ContextAlpha, new ContextAlphaImpl(`immediate-parent-alpha`)],
      ]),
    };
  }
}

export class ImmediateContextParentWithWrapper extends Component {
  get config() {
    return {
      template: (state) =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`div`, {class: {foo: true}}, [
            h(`div`, {class: {foo: true}}, [
              h(`context-alpha-widget`),
            ]),
            h(`p`, `asdf`),
          ]),
          h(`p`, `asdf`),
        ]),
      defaultContexts: new Map([
        [ContextAlpha, new ContextAlphaImpl(`immediate-parent-alpha-with-wrapper`)],
      ]),
    };
  }
}

export class ShadowDomContextParent extends Component {
  get config() {
    return {
      template: (state) =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`div`, {class: {foo: true}}, [
            h(`div`, {class: {foo: true}}, [
              h(`context-alpha-widget`),
            ]),
            h(`p`, `asdf`),
          ]),
          h(`p`, `asdf`),
        ]),
      defaultContexts: new Map([
        [ContextAlpha, new ContextAlphaImpl(`shadow-dom-parent-alpha`)],
      ]),
      useShadowDom: true,
    };
  }
}

export class ContextAlphaSlottedWidget extends Component {
  get config() {
    return {
      template: (state) =>
        h(`slot`),
      defaultContexts: new Map([
        [ContextAlpha, new ContextAlphaImpl(`slotted-alpha`)],
      ]),
    };
  }
}

export class ContextAlphaAltSlottedWidget extends Component {
  get config() {
    return {
      template: (state) =>
        h(`slot`),
      defaultContexts: new Map([
        [ContextAlpha, new ContextAlphaAltImpl()],
      ]),
    };
  }
}

export class NestedSlottedContextWidgets extends Component {
  get config() {
    return {
      template: (state) =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`context-alpha-slotted-widget`, {class: {foo: true}}, [
            h(`span`, {class: {foo: true}}, [
              h(`context-alpha-alt-slotted-widget`, {class: {foo: true}}, [
                h(`context-alpha-widget`),
              ]),
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
      template: (state) =>
        h(`immediate-context-parent`, {class: {foo: true}}),
      defaultContexts: new Map([
        [ContextAlpha, new ContextAlphaImpl(`grandparent-alpha`)],
      ]),
    };
  }
}

export class ContextBravoWidget extends Component {
  get config() {
    return {
      template: (state) =>
        h(`div`, {class: {foo: true}}),
      defaultContexts: new Map([
        [ContextBravo, new ContextBravoImpl(`default-bravo`)],
      ]),
    };
  }
}

export class ContextBravoParentWithNestedAlphaWidgets extends Component {
  get config() {
    return {
      template: (state) =>
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
      defaultContexts: new Map([
        [ContextBravo, new ContextBravoImpl(`parent-bravo`)],
      ]),
    };
  }
}

export class ContextlessSlottedWrapper extends Component {
  get config() {
    return {
      template: (state) =>
        h(`slot`),
    };
  }
}

export class ContextParentWithContextlessSlottedWrapper extends Component {
  get config() {
    return {
      template: (state) =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`contextless-slotted-wrapper`, {class: {foo: true}}, [
            h(`context-alpha-widget`),
          ]),
          h(`p`, `asdf`),
        ]),
      defaultContexts: new Map([
        [ContextAlpha, new ContextAlphaImpl(`parent-alpha`)],
      ]),
    };
  }
}

export class ContextlessComponentWrapper extends Component {
  get config() {
    return {
      template: (state) =>
        h(`context-alpha-widget`),
    };
  }
}

export class ContextParentWithContextlessComponentWrapper extends Component {
  get config() {
    return {
      template: (state) =>
        h(`div`, {class: {foo: true}}, [
          h(`contextless-component-wrapper`),
        ]),
      defaultContexts: new Map([
        [ContextAlpha, new ContextAlphaImpl(`parent-alpha`)],
      ]),
    };
  }
}
