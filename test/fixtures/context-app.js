import {Component, h} from '../../lib';
import {LightTheme, DarkTheme, LoadCounter} from './simple-contexts';

export class DefaultLightThemedWidget extends Component {
  get config() {
    return {
      template: () => h(`div`, {class: {[this.getContext(`theme`).getName()]: true}}),
      contexts: [`theme`],
      defaultContexts: {
        theme: new LightTheme(),
      },
    };
  }
}

export class ThemedWidget extends Component {
  get config() {
    return {
      template: () => h(`div`, {class: {[this.getContext(`theme`).getName()]: true}}),
      contexts: [`theme`],
    };
  }
}

export class MultiThemedWidget extends Component {
  get config() {
    return {
      template: () =>
        h(`div`, {
          class: {[this.getContext(`theme`).getName()]: true, [this.getContext(`invertedTheme`).getName()]: true},
        }),
      contexts: [`theme`, `invertedTheme`],
    };
  }
}

export class DarkApp extends Component {
  get config() {
    return {
      template: () =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`div`, {class: {foo: true}}, [
            h(`div`, {class: {foo: true}}, [h(`default-light-themed-widget`)]),
            h(`p`, `asdf`),
          ]),
          h(`p`, `asdf`),
        ]),
      defaultContexts: {theme: new DarkTheme()},
    };
  }
}

export class ShadowDomDarkApp extends Component {
  get config() {
    return {
      template: () =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`div`, {class: {foo: true}}, [
            h(`div`, {class: {foo: true}}, [h(`default-light-themed-widget`)]),
            h(`p`, `asdf`),
          ]),
          h(`p`, `asdf`),
        ]),
      defaultContexts: {theme: new DarkTheme()},
      useShadowDom: true,
    };
  }
}

export class SlottedDarkApp extends Component {
  get config() {
    return {
      template: () =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`div`, {class: {foo: true}}, [h(`div`, {class: {foo: true}}, [h(`slot`)]), h(`p`, `asdf`)]),
          h(`p`, `asdf`),
        ]),
      defaultContexts: {theme: new DarkTheme()},
      useShadowDom: true,
    };
  }
}

export class SlottedLightApp extends Component {
  get config() {
    return {
      template: () =>
        h(`div`, {class: {[this.getContext(`theme`).getName()]: true}}, [
          h(`p`, `asdf`),
          h(`div`, {class: {foo: true}}, [h(`div`, {class: {foo: true}}, [h(`slot`)]), h(`p`, `asdf`)]),
          h(`p`, `asdf`),
        ]),
      contexts: [`theme`],
      defaultContexts: {theme: new LightTheme()},
      useShadowDom: true,
    };
  }
}

export class SlottedInvertedLightApp extends Component {
  get config() {
    return {
      template: () =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`div`, {class: {foo: true}}, [h(`div`, {class: {foo: true}}, [h(`slot`)]), h(`p`, `asdf`)]),
          h(`p`, `asdf`),
        ]),
      defaultContexts: {invertedTheme: new LightTheme()},
      useShadowDom: true,
    };
  }
}

export class SlottedLoadCounterWidget extends Component {
  get config() {
    return {
      template: () =>
        h(`div`, {class: {foo: true}}, [
          h(`p`, `asdf`),
          h(`div`, {class: {foo: true}}, [h(`div`, {class: {foo: true}}, [h(`slot`)]), h(`p`, `asdf`)]),
          h(`p`, `asdf`),
        ]),
      contexts: [`loadCounter`],
      defaultContexts: {loadCounter: new LoadCounter()},
      useShadowDom: true,
    };
  }
}
