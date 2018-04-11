import {h} from 'snabbdom';
import Component from './component';

/**
 * Definition of a generic Component which proxies attributes and events
 * between itself and a variable child component.
 *
 * @extends Component
 */
export default class ProxyComponent extends Component {
  get config(){
    return Object.assign({
      template: ({$component}) => {
        return h($component.getTargetElement(), {
          attrs: $component.getAttributes(),
          on: $component._getProxiedEventHandlers(),
        });
      },
    }, this.localConfig);
  }

  /**
   * Override this to extend the default configuration.
   *
   * @see Component#config
   */
  get localConfig() {
    return {};
  }

  /**
   * Override to determine which tag to instantiate as the child.
   *
   * This is where all switching logic should go.
   *
   * @returns  {string}
   *
   * @example <caption>a URL based feature flag</caption>
   * class MyWidget extends ProxyComponent {
   *   getTargetElement() {
   *     if (window.location.search.includes('enable_beta') {
   *       return 'my-widget-v2';
   *     }
   *
   *     return 'my-widget-v1'
   *   }
   * }
   */
  getTargetElement() {
    throw new Error(`You must override getTargetElement().`);
  }

  _getProxiedEventHandlers() {
    const handler = this.proxyEventHandler.bind(this);
    return this.observedEvents.reduce((acc, evt) => {
      acc[evt] = handler;
      return acc;
    }, {});
  }

  /**
   * Override this method to stop events from being bubbled through this element.
   *
   * @example <caption>filter specific events out</caption>
   * class MyWidget extends ProxyComponent {
   *   allowEvent(ev) {
   *     // don't propagate click events for the v2 component
   *     return this.getTargetElement() !== `my-widget-v2` && event.type !== `click`;
   *   }
   * }
   */
  allowEvent(event) {
    return true;
  }

  /**
   * Proxied events will be stripped of their native attributes and re-wrapped as CustomEvents. Callers
   * should assume that only `detail` remains intact.
   */
  proxyEventHandler(ev) {
    if (!this.allowEvent(event)) {
      return false;
    }

    if (!ev.bubbles) {
      this.dispatchEvent(new CustomEvent(ev.type, ev));
    }

    return true;
  }

  /**
   * Return a map of attributes to pass to the child.
   */
  getAttributes() {
    const attributes = {};
    for (let attr of this.attributes) {
      attributes[attr.name] = attr.value;
    }

    return attributes;
  }

  /**
   * Define the events which will be emitted by the wrapped component.
   * Bubbling events will bubble through, but non-composed events from ShadowDOM
   * elements will not and will be re-dispatched from the proxy.
   */
  get observedEvents() {
    return [];
  }
}
