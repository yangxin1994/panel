import {VNode} from 'snabbdom/vnode';
import {WebComponent} from 'webcomponent';

interface Helpers {
  [helper: string]: any;
}

interface Routes {
  [route: string]: Function,
}

interface Hooks<State> {
  /** Function called before an update is applied */
  preUpdate?: (stateUpdate: Partial<State>) => void;

  /** Function called after an update is applied */
  postUpdate?: (stateUpdate: Partial<State>) => void;

  [hookName: string]: (params: any) => void;
}

interface TemplateScope<AppState = {}> {
  /** AppState of the root panel component */
  $app: AppState;

  /** Attributes parsed from component's html attributes using attrsSchema */
  $attrs: {[attr: string]: any};

  /** A reference to the component itself */
  $component: WebComponent;

  /** Helpers defined in component config */
  $helpers: Helpers;
}

interface ConfigOptions<State, AppState> {
  /** Function transforming state object to virtual dom tree */
  template(scope: (TemplateScope<AppState> & State)): VNode;

  /** Component-specific Shadow DOM stylesheet */
  css?: string;

  /** An initial default value for the component's state property */
  defaultState?: State;

  /**
   * A state object to share with nested descendant components. If not set, root component
   * shares entire state object with all descendants. Only applicable to app root components.
   */
  appState?: AppState;

  /** Properties and functions injected automatically into template state object */
  helpers?: Helpers;

  /** Extra rendering/lifecycle callbacks */
  hooks?: Hooks<State>;

  /** Object mapping string route expressions to handler functions */
  routes?: {[route: string]: Function};

  /** Whether to apply updates to DOM immediately, instead of batching to one update per frame */
  updateSync?: boolean;

  /** Whether to use Shadow DOM */
  useShadowDom?: boolean;
}

interface AttrSchema {
  /** Type of the attribute. One of 'string' | 'number' | 'boolean' | 'json' */
  type: string;

  /** Default value if the attr is not defined */
  default?: any;

  /** Description of attribute, what it does e.t.c */
  description?: string;

  /** Possible values of an attribute. e.g ['primary', 'secondary'] */
  enum?: Array<string>;
}
