import {Component, h} from '../../lib';
import {LightTheme, DarkTheme} from './simple-contexts';

export class DefaultLightThemedWidget extends Component {
  get config() {
    return {
      template: () => h(`div`, {class: {foo: true}}),
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
      template: () => h(`div`, {class: {foo: true}}),
      contexts: [`theme`],
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
            h(`div`, {class: {foo: true}}, [
              h(`default-light-themed-widget`),
            ]),
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
            h(`div`, {class: {foo: true}}, [
              h(`default-light-themed-widget`),
            ]),
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
          h(`div`, {class: {foo: true}}, [
            h(`div`, {class: {foo: true}}, [
              h(`slot`),
            ]),
            h(`p`, `asdf`),
          ]),
          h(`p`, `asdf`),
        ]),
      defaultContexts: {theme: new DarkTheme()},
      useShadowDom: true,
    };
  }
}
