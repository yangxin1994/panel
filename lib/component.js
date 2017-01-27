import cuid from 'cuid';
import h from 'snabbdom/h';
import WebComponent from 'webcomponent';

import DOMPatcher from './dom-patcher';
import Router from './router';

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
  get config() {
    return {};
  }

  /**
   * Template helper functions defined in config object, and exposed to template code
   * as $helpers. This getter uses the component's internal config cache.
   * @type {object}
   * @example
   * {
   *   myHelper: () => 'some return value',
   * }
   */
  get helpers() {
    return this.getConfig(`helpers`);
  }

  /**
   * For use inside view templates, to create a child Panel component nested under this
   * component, which will share its state object and update cycle.
   * @param {string} tagName - the HTML element tag name of the custom element
   * to be created
   * @param {object} [config={}] - snabbdom node config (second argument of h())
   * @returns {object} virtual-dom node
   * @example
   * {template: state => h('.header', this.child('my-child-widget'))}
   */
  child(tagName, config={}) {
    config.props = Object.assign({}, config.props, {$panelParentID: this.panelID});
    return h(tagName, config);
  }

  /**
   * Searches the component's Panel ancestors for the first component of the
   * given type (HTML tag name).
   * @param {string} tagName - tag name of the parent to search for
   * @returns {object} Panel component
   * @throws Throws an error if no parent component with the given tag name is found.
   * @example
   * myWidget.findPanelParentByTagName('my-app');
   */
  findPanelParentByTagName(tagName) {
    tagName = tagName.toLowerCase();
    for (let node = this.$panelParent; !!node; node = node.$panelParent) {
      if (node.tagName.toLowerCase() === tagName) {
        return node;
      }
    }
    throw Error(`${tagName} not found`);
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
   * Sets a value in the component's configuration map after element
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
    this.panelID = cuid();
    this._config = Object.assign({}, {
      css: '',
      helpers: {},
      routes: {},
      template: () => { throw Error('No template provided by Component subclass'); },
      updateSync: false,
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

    if (typeof this.$panelParentID !== 'undefined') {
      this.isPanelChild = true;
      // find $panelParent
      for (let node = this.parentNode; node && !this.$panelParent; node = node.parentNode) {
        if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {  // handle shadow-root
          node = node.host;
        }
        if (node.panelID === this.$panelParentID) {
          this.$panelParent = node;
          this.$panelRoot = node.$panelRoot;
        }
      }
      if (!this.$panelParent) {
        throw Error(`panelParent ${this.$panelParentID} not found`);
      }
      this.$panelParent.$panelChildren.add(this);
      this.state = this.$panelRoot.state;
    } else {
      this.isPanelRoot = true;
      this.$panelRoot = this;
      this.$panelParent = null;
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

    if (Object.keys(this.getConfig('routes')).length) {
      this.router = new Router(this, {historyMethod: this.historyMethod});
      this.navigate(window.location.hash);
    }

    this.domPatcher = new DOMPatcher(this.state, this._render.bind(this), {
      updateMode: this.getConfig('updateSync') ? 'sync': 'async',
    });
    this.el.appendChild(this.domPatcher.el);
    this.initialized = true;
  }

  detachedCallback() {
    this.$panelParent && this.$panelParent.$panelChildren.delete(this);
    this.el.removeChild(this.domPatcher.el);
    this.domPatcher = null;
    this.initialized = false;
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
      this.domPatcher.update(state);
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
          $helpers: this.helpers,
        }));
      } catch(e) {
        this.logError(`Error while rendering ${this.toString()}`, this, e.stack);
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
