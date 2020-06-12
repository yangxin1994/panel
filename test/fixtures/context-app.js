import {Component, h} from '../../lib';
import {ContextAlpha, ContextAlphaImpl, ContextAlphaAltImpl} from './simple-contexts';

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
