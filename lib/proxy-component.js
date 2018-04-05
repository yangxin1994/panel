import {h} from 'snabbdom';
import Component from './component';

export default class ProxyComponent extends Component {
  get config(){
    return {
      template: ({$component}) => {
        return h($component.getTargetElement(), {
          attrs: $component.getAttributes(),
          on: $component._getProxiedEventHandlers(),
        });
      },
    };
  }

  /*
   * Override to define which type of element will be instantiated.
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

  /*
   * Override to prevent events from leaking through.
   */
  allowEvent(event) {
    return true;
  }

  /*
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

  getAttributes() {
    const attributes = {};
    // todo: use observedAttributes to decide which ones to copy?
    for (let attr of this.attributes) {
      attributes[attr.name] = attr.value;
    }

    return attributes;
  }

  /*
   * Define the events which will be emitted by the wrapped component.
   * Bubbling events will bubble through, but non-composed events from ShadowDOM
   * elements will not and will be re-dispatched from the proxy.
   */
  get observedEvents() {
    return [];
  }

  /*
   * Override in your subclass.
   */
  static get observedAttributes() {
    return Component.observedAttributes;
  }
}
