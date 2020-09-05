import {Component, ConfigOptions} from '../../lib';
import {Theme, LightTheme, DarkTheme, LoadCounter} from './simple-contexts';

interface TestContextRegistry {
  theme: Theme;
  invertedTheme: Theme;
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

export class MultiThemedWidget extends Component<any, any, any, any, TestContextRegistry> {
  get config(): {
    template: any;
    contexts: ['theme', 'invertedTheme'];
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

export class SlottedLightApp extends Component<any, any, any, any, TestContextRegistry> {
  get config(): {
    template: any;
    contexts: ['theme'];
    defaultContexts: {
      theme: LightTheme;
    };
    useShadowDom: boolean;
  };
}

export class SlottedInvertedLightApp extends Component<any, any, any, any, TestContextRegistry> {
  get config(): {
    template: any;
    defaultContexts: {
      invertedTheme: LightTheme;
    };
    useShadowDom: boolean;
  };
}

export class SlottedLoadCounterWidget extends Component<any, any, any, any, TestContextRegistry> {
  get config(): {
    template: any;
    contexts: ['loadCounter'];
    defaultContexts: {
      loadCounter: LoadCounter;
    };
    useShadowDom: boolean;
  };
}
