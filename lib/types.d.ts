
import {VNode} from 'snabbdom/vnode';
import {WebComponent} from 'webcomponent';
import Router from './router';

export {h} from 'snabbdom/h';
/**
 * Optional component wrappers and utilities for state management;
 * exported in the main {@link panel} module for convenience.
 * @module componentUtils
 * @example
 * // direct top-level import
 * import {ProxyComponent, StateController} from 'panel';
 * // module import
 * import {ComponentUtils} from 'panel';
 * const {ProxyComponent, StateController} = ComponentUtils;
 */
declare module componentUtils {
    /** {@link ControlledComponent} class, to be subclassed by apps
     */
    var ControlledComponent: any;
    /** {@link ProxyComponent} class, to be subclassed by apps
     */
    var ProxyComponent: any;
    /** {@link StateController} class, to be subclassed by apps
     */
    var StateController: any;
    /** A simple subscribable state store
     */
    var StateStore: any;
}

/**
 * Definition of a generic Component which proxies attributes and events
 * between itself and a variable child component.
 *
 * @template State
 * @template AppState
 * @template App
 * @extends Component<State,AppState,App>
 */
declare class ProxyComponent<State, AppState, App> extends Component<State,AppState,App> {
    /**
     * Override this to extend the default configuration.
     *
     * @see Component#config
     */
    localConfig: any;
    /**
     * Override to determine which tag to instantiate as the child.
     *
     * This is where all switching logic should go.
     *
     * @returns {string} - tag name of the component to instantiate
     *
     * @example <caption>a URL based feature flag</caption>
     * class MyWidget extends ProxyComponent {
     *   getTargetElementTag() {
     *     if (window.location.search.includes('enable_beta') {
     *       return 'my-widget-v2';
     *     }
     *
     *     return 'my-widget-v1'
     *   }
     * }
     */
    getTargetElementTag(): string;
    /**
     * Override this method to stop events from being bubbled through this element.
     * @param {Event} ev - event to check
     * @returns {boolean} whether event should bubble through
     *
     * @example <caption>filter specific events out</caption>
     * class MyWidget extends ProxyComponent {
     *   allowEvent(ev) {
     *     // don't propagate click events for the v2 component
     *     return this.getTargetElementTag() !== `my-widget-v2` && ev.type !== `click`;
     *   }
     * }
     */
    allowEvent(ev: Event): boolean;
    /**
     * Defines the names of events which will be emitted by the wrapped component.
     * Bubbling events will bubble through, but non-composed events from ShadowDOM
     * elements will not and will be re-dispatched from the proxy.
     * @type {string[]}
     */
    observedEvents: string[];
}

/**
 * A StateController manages state for an application or component
 * Subclasses extend this and expose methods that call the controller's _update method
 * Controller will default create its own state store unless one is passed.
 * StateController subclasses should only accept the dependencies they need via constructor
 * This means the dependencies can easily be mocked and unit tested
 *
 * @template State
 */
declare class StateController<State> {
    constructor(options: {
        store: StateStore<State>;
    });
    /**
     * An initial default property bag for the controller's state implemented as get defaultState()
     *
     * @readonly
     */
    readonly defaultState: any;
    /**
     * A readonly version of controller's state
     *
     * @readonly
     */
    readonly state: any;
    /**
     * Discourage external users from using state directly
     *
     * @param {Partial<State>} props
     */
    _update(props: Partial<State>): void;
    /**
     * @internal Subscribe to state updates via a listener callback.
     * panel component uses this to trigger dom update pipeline
     * Only use for rendering and debugging purposes
     *
     * @param {(props: Partial<State>) => void} listener
     */
    subscribeUpdates(listener: any): void;
    /**
     * @internal Unsubscribe the listener callback that was passed to subscribeUpdates
     *
     * @param {(props: Partial<State>) => void} listener
     */
    unsubscribeUpdates(listener: any): void;
}

/**
 * StateStore stores state and allows an observer to subscribe to state updates
 *
 * @template State
 */
declare class StateStore<State> {
    constructor();
    /** @type {State}
     */
    _state: State;
    /**
     * A readonly version of controller's state
     *
     * @readonly
     */
    readonly state: any;
    /**
     * Update the state by passing in a property bag
     *
     * @param {Partial<State>} props
     */
    update(props: Partial<State>): void;
    /**
     * @internal Subscribe to state updates via a listener callback.
     * Only use for rendering and debugging purposes
     *
     * @param {(props: Partial<State>) => void} listener
     */
    subscribeUpdates(listener: any): void;
    /**
     * @internal Unsubscribe the listener callback that was passed to subscribeUpdates
     *
     * @param {(props: Partial<State>) => void} listener
     */
    unsubscribeUpdates(listener: any): void;
}

/**
 * Definition of a Panel component/app, implemented as an HTML custom element.
 * App logic and configuration is defined by extending this class. Instantiating
 * a component is typically not done by calling the constructor directly, but
 * either by including the tag in HTML markup, or by using the DOM API method
 * [document.createElement]{@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}.
 *
 * @example <caption>Defining a Panel component</caption>
 * class MyWidget extends Component {
 *   get config() {
 *     return {
 *       // options go here
 *     };
 *   }
 *
 *   myMethod() {
 *     // etc
 *   }
 * }
 *
 * @example <caption>Registering the custom element definition for the DOM</caption>
 * customElements.define('my-widget', MyWidget);
 *
 * @example <caption>Adding an instance of the element to the DOM</caption>
 * <my-widget some-attr></my-widget>
 *
 * @template State
 * @template AppState
 * @template App
 * @extends WebComponent
 */
export declare class Component<State, AppState, App> extends WebComponent {
    constructor();
    /**
     * Defines standard component configuration.
     * @type {object}
     * @property {(scope: (TemplateScope<AppState> & State)): VNode} template - function transforming state object to virtual dom tree
     * @property {Helpers} [helpers={}] - properties and functions injected automatically into template state object
     * @property {Routes} [routes={}] - object mapping string route expressions to handler functions
     * @property {AppState} [appState={}] - (app root component only) state object to share with nested descendant components;
     * if not set, root component shares entire state object with all descendants
     * @property {State} [defaultState={}] - default entries for component state
     * @property {Hooks<State>} [hooks={}] - extra rendering/lifecycle callbacks
     * @property {boolean} [updateSync=false] - whether to apply updates to DOM
     * immediately, instead of batching to one update per frame
     * @property {boolean} [useShadowDom=false] - whether to use Shadow DOM
     * @property {string} [css=''] - component-specific Shadow DOM stylesheet
     * @example
     * get config() {
     *   return {
     *     template: state => h('.name', `My name is ${name}`),
     *     routes: {
     *       'wombat/:wombatId': (stateUpdate={}, wombatId) => {
     *         // route handler implementation
     *       },
     *     },
     *   };
     * }
     */
    config: {
        helpers?: Helpers;
        routes?: Routes;
        appState?: AppState;
        defaultState?: State;
        hooks?: Hooks<State>;
        updateSync?: boolean;
        useShadowDom?: boolean;
        css?: string;
    };
    /**
     * Template helper functions defined in config object, and exposed to template code
     * as $helpers. This getter uses the component's internal config cache.
     * @type {object}
     * @example
     * {
     *   myHelper: () => 'some return value',
     * }
     */
    helpers: any;
    /**
     * For use inside view templates, to create a child Panel component nested under this
     * component, which will share its state object and update cycle.
     * @param {string} tagName - the HTML element tag name of the custom element
     * to be created
     * @param {object} [config={}] - snabbdom node config (second argument of h())
     * @returns {object} snabbdom vnode
     * @example
     * {template: state => h('.header', this.child('my-child-widget'))}
     */
    child(tagName: string, config?: any): any;
    /**
     * Searches the component's Panel ancestors for the first component of the
     * given type (HTML tag name).
     * @param {string} tagName - tag name of the parent to search for
     * @returns {object} Panel component
     * @throws Throws an error if no parent component with the given tag name is found.
     * @example
     * myWidget.findPanelParentByTagName('my-app');
     */
    findPanelParentByTagName(tagName: string): any;
    /**
     * Fetches a value from the component's configuration map (a combination of
     * values supplied in the config() getter and defaults applied automatically).
     * @param {string} key - key of config item to fetch
     * @returns value associated with key
     * @example
     * myWidget.getConfig('css');
     */
    getConfig(key: string): any;
    /**
     * Executes the route handler matching the given URL fragment, and updates
     * the URL, as though the user had navigated explicitly to that address.
     * @param {string} fragment - URL fragment to navigate to
     * @param {object} [stateUpdate={}] - update to apply to state object when
     * routing
     * @example
     * myApp.navigate('wombat/54', {color: 'blue'});
     */
    navigate(fragment: string, stateUpdate?: any): void;
    /**
     * Sets a value in the component's configuration map after element
     * initialization.
     * @param {string} key - key of config item to set
     * @param val - value to associate with key
     * @example
     * myWidget.setConfig('template', () => h('.new-template', 'Hi'));
     */
    setConfig(key: string, val: any): void;
    /**
     * To be overridden by subclasses, defining conditional logic for whether
     * a component should rerender its template given the state to be applied.
     * In most cases this method can be left untouched, but can provide improved
     * performance when dealing with very many DOM elements.
     * @param {Partial<State>} state - state object to be used when rendering
     * @returns {boolean} whether or not to render/update this component
     * @example
     * shouldUpdate(state) {
     *   // don't need to rerender if result set ID hasn't changed
     *   return state.largeResultSetID !== this._cachedResultID;
     * }
     */
    shouldUpdate(state: Partial<State>): boolean;
    /**
     * Applies a state update, triggering a re-render check of the component as
     * well as any other components sharing the same state. This is the primary
     * means of updating the DOM in a Panel application.
     * @param {Partial<State>} [stateUpdate={}] - keys and values of entries to update in
     * the component's state object
     * @example
     * myWidget.update({name: 'Bob'});
     */
    update(stateUpdate?: Partial<State>): void;
    /**
     * Applies a state update specifically to app state shared across components.
     * In apps which don't specify `appState` in the root component config, all
     * state is shared across all parent and child components and the standard
     * update() method should be used instead.
     * @param {Partial<AppState>} [stateUpdate={}] - keys and values of entries to update in
     * the app's appState object
     * @example
     * myWidget.updateApp({name: 'Bob'});
     */
    updateApp(stateUpdate?: Partial<AppState>): void;
    /** @type {App}
     */
    app: App;
    /** @type {State}
     */
    state: State;
    /** @type {AppState}
     */
    appState: AppState;
    /** @type {Component<unknown, unknown, unknown>}
     */
    $panelParent: Component<unknown, unknown, unknown>;
    /** @type {HTMLElement}
     */
    el: HTMLElement;
    /** @type {Router}
     */
    router: Router;
    /** @type {boolean}
     */
    initialized: boolean;
    /**
     * @returns {AttrSchema}
     */
    static attrsSchema: any;
    /**
     * Validates attrsSchema and syncs element attributes defined in attrsSchema with this.attrs
     */
    _syncAttrs(): void;
    /**
     * Parses html attribute using type information from attrsSchema and updates this.attrs
     * @param {string} attr - attribute name
     */
    _updateAttr(attr: string): void;
}

/**
 * Entry point for Panel apps and components
 * @module panel
 * @example
 * import { Component } from 'panel';
 * customElements.define('my-widget', class extends Component {
 *   // app definition
 * });
 */
declare module panel {
    /** {@link Component} class, to be subclassed by apps
     */
    var Component: any;
    /** {@link component-utils} wrappers and utilities
     */
    var ComponentUtils: any;
    /** {@link ControlledComponent} class, to be subclassed by apps
     */
    var ControlledComponent: any;
    /** {@link ProxyComponent} class, to be subclassed by apps
     */
    var ProxyComponent: any;
    /** {@link StateController} class, to be subclassed by apps
     */
    var StateController: any;
    /** A simple subscribable state store
     */
    var StateStore: any;
    /**
     * [snabbdom]{@link https://github.com/snabbdom/snabbdom} function to create Hyperscript nodes,
     * exported here for user convenience
     */
    var h: any;
}

