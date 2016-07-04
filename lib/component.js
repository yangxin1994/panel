import MainLoop from 'main-loop';
import create from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import h from 'virtual-dom/virtual-hyperscript';
import WebComponent from 'webcomponent';

import Router from './router';

let panelID = 1;
const DOCUMENT_FRAGMENT_NODE = 11;
const EMPTY_DIV = h('div');

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
 * document.registerElement('my-widget', MyWidget);
 *
 * @example <caption>Adding an instance of the element to the DOM</caption>
 * <my-widget some-attr></my-widget>
 *
 * @extends WebComponent
 */
class Component extends WebComponent {

  /**
   * Defines standard component configuration.
   * @type {object}
   * @property {function} template - function transforming state object to virtual-dom tree
   * @property {object} [helpers={}] - properties and functions injected automatically into template state object
   * @property {object} [routes={}] - object mapping string route expressions to handler functions
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
  get config() {
    return {};
  }

  /**
   * For use inside view templates, to create a child Panel component nested under this
   * component, which will share its state object and update cycle.
   * @param {string} tagName - the HTML element tag name of the custom element
   * to be created
   * @param {object} [attrs={}] - HTML attributes to assign to the child
   * @returns {object} virtual-dom node
   * @example
   * {template: state => h('.header', this.child('my-child-widget'))}
   */
  child(tagName, attrs={}) {
    attrs = Object.assign({}, attrs);
    attrs.attributes = Object.assign({}, attrs.attributes, {'panel-parent': this.panelID});
    return h(tagName, attrs);
  }

  /**
   * Fetches a value from the component's configuration map (a combination of
   * values supplied in the config() getter and defaults applied automatically).
   * @param {string} key - key of config item to fetch
   * @returns value associated with key
   * @example
   * myWidget.getConfig('css');
   */
  getConfig(key) {
    return this._config[key];
  }

  /**
   * Executes the route handler matching the given URL fragment, and updates
   * the URL, as though the user had navigated explicitly to that address.
   * @param {string} fragment - URL fragment to navigate to
   * @param {object} [stateUpdate={}] - update to apply to state object when
   * routing
   * @example
   * myApp.navigate('wombat/54', {color: 'blue'});
   */
  navigate() {
    this.$panelRoot.router.navigate(...arguments);
  }

  /**
   * Sets a value from the component's configuration map after element
   * initialization.
   * @param {string} key - key of config item to set
   * @param val - value to associate with key
   * @example
   * myWidget.setConfig('template', () => h('.new-template', 'Hi'));
   */
  setConfig(key, val) {
    this._config[key] = val;
  }

  /**
   * To be overridden by subclasses, defining conditional logic for whether
   * a component should rerender its template given the state to be applied.
   * In most cases this method can be left untouched, but can provide improved
   * performance when dealing with very many DOM elements.
   * @param {object} state - state object to be used when rendering
   * @returns {boolean} whether or not to render/update this component
   * @example
   * shouldUpdate(state) {
   *   // don't need to rerender if result set ID hasn't changed
   *   return state.largeResultSetID !== this._cachedResultID;
   * }
   */
  shouldUpdate(state) {
    return true;
  }

  /**
   * Applies a state update, triggering a re-render check of the component as
   * well as any other components sharing the same state. This is the primary
   * means of updating the DOM in a Panel application.
   * @param {object} [stateUpdate={}] - keys and values of entries to update in
   * the component's state object
   * @example
   * myWidget.update({name: 'Bob'});
   */
  update(stateUpdate={}) {
    if (!this.initialized) {
      Object.assign(this.state, stateUpdate);
    } else if (this.isPanelRoot) {
      const updateHash = '$fragment' in stateUpdate && stateUpdate.$fragment !== this.state.$fragment;

      Object.assign(this.state, stateUpdate);
      this.updateSelfAndChildren(this.state);

      if (updateHash) {
        this.router.replaceHash(this.state.$fragment);
      }
    } else {
      this.$panelRoot.update(stateUpdate);
    }
  }

  createdCallback() {
    this.panelID = panelID++;
    this._config = Object.assign({}, {
      css: '',
      helpers: {},
      routes: {},
      template: () => { throw Error('No template provided by Component subclass'); },
      useShadowDom: false,
    }, this.config);
    this.state = {};
    if (this.getConfig('useShadowDom')) {
      this.el = this.createShadowRoot();
      this.styleTag = document.createElement('style');
      this.styleTag.innerHTML = this.getConfig('css');
      this.el.appendChild(this.styleTag);
    } else if (this.getConfig('css')) {
      throw Error('"useShadowDom" config option must be set in order to use "css" config.');
    } else {
      this.el = this;
    }
  }

  attachedCallback() {
    this.$panelChildren = new Set();

    const parentID = Number(this.getAttribute('panel-parent'));
    if (parentID) {
      this.isPanelChild = true;
      // find $panelParent
      for (let node = this.parentNode; node && !this.$panelParent; node = node.parentNode) {
        if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {  // handle shadow-root
          node = node.host;
        }
        if (node.panelID === parentID) {
          this.$panelParent = node;
          this.$panelRoot = node.$panelRoot;
        }
      }
      if (!this.$panelParent) {
        throw `panel-parent ${parentID} not found`;
      }
      this.$panelParent.$panelChildren.add(this);
      this.state = this.$panelRoot.state;
    } else {
      this.isPanelRoot = true;
      this.$panelRoot = this;
    }
    this.app = this.$panelRoot;

    const newState = Object.assign(
      {},
      this.getConfig('defaultState'),
      this.state,
      this.getJSONAttribute('data-state'),
      this._stateFromAttributes()
    );
    Object.assign(this.state, newState);

    this.loop = MainLoop(this.state, this._render.bind(this), {create, diff, patch});
    this.el.appendChild(this.loop.target);
    this.initialized = true;

    if (Object.keys(this.getConfig('routes')).length) {
      this.router = new Router(this, {historyMethod: this.historyMethod});
      this.navigate(window.location.hash);
    }
  }

  detachedCallback() {
    this.$panelParent && this.$panelParent.$panelChildren.delete(this);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === 'style-override') {
      this._applyStyles(newVal);
    }
    if (this.isPanelRoot && this.initialized) {
      this.update();
    }
  }

  _applyStyles(styleOverride) {
    if (this.getConfig('useShadowDom')) {
      this.styleTag.innerHTML = this.getConfig('css') + (styleOverride || '');
    }
  }

  logError() {
    console.error(...arguments);
  }

  toString() {
    try {
      return `${this.tagName}#${this.panelID}`;
    } catch(e) {
      return 'UNKNOWN COMPONENT';
    }
  }

  updateSelfAndChildren(state) {
    if (this.initialized && this.shouldUpdate(state)) {
      this.loop.update(state);
      for (let child of this.$panelChildren) {
        child.updateSelfAndChildren(state);
      }
    }
  }

  _render(state) {
    if (this.shouldUpdate(state)) {
      try {
        this._rendered = this.getConfig('template')(Object.assign({}, state, {
          $component: this,
          $helpers: this.getConfig('helpers'),
        }));
      } catch(e) {
        this.logError(`Error while rendering ${this.toString()}`, this, e);
      }
    }
    return this._rendered || EMPTY_DIV;
  }

  _stateFromAttributes() {
    let state = {};

    // this.attributes is a NamedNodeMap, without normal iterators
    for (let ai = 0; ai < this.attributes.length; ai++) {
      let attr = this.attributes[ai];
      let attrMatch = attr.name.match(/^state-(.+)/);
      if (attrMatch) {
        let num = Number(attr.value);
        state[attrMatch[1]] = isNaN(num) ? attr.value : num;
      }
    }

    return state;
  }
}

export default Component;
