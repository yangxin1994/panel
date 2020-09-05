import {Component, ConfigOptions} from '../../lib';
import {Theme, LightTheme, DarkTheme, LoadCounter} from './simple-contexts';

interface TestContextRegistry {
  theme: Theme;
  energySavingTheme: Theme;
  loadCounter: LoadCounter;
}

export class DefaultLightThemedWidget extends Component<any, any, any, any, TestContextRegistry> {
  get config(): {
    template: any;
    contexts: ['theme'];
    defaultContexts: {
      theme: LightTheme;
    };
  };
}

export class ThemedWidget extends Component<any, any, any, any, TestContextRegistry> {
  get config(): {
    template: any;
    contexts: ['theme'];
  };
}

export class DarkApp extends Component<any, any, any, any, TestContextRegistry> {
  get config(): {
    template: any;
    defaultContexts: {
      theme: DarkTheme;
    };
  };
}

export class ShadowDomDarkApp extends Component<any, any, any, any, TestContextRegistry> {
  get config(): {
    template: any;
    defaultContexts: {
      theme: DarkTheme;
    };
    useShadowDom: boolean;
  };
}

export class SlottedDarkApp extends Component<any, any, any, any, TestContextRegistry> {
  get config(): {
    template: any;
    defaultContexts: {
      theme: DarkTheme;
    };
    useShadowDom: boolean;
  };
}
