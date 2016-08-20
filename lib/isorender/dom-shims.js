import 'html-element'; // DOM shim
import requestAnimationFrame from 'raf';

// patch DOM insertion functions to call attachedCallback on Custom Elements
['appendChild', 'insertBefore', 'replaceChild'].forEach(funcName => {
  const origFunc = Element.prototype[funcName];
  Element.prototype[funcName] = function() {
    const child = origFunc.apply(this, arguments);
    requestAnimationFrame(() => {
      if (!child.initialized && child.attachedCallback) {
        child.attachedCallback();
      }
    });
  };
});

class HTMLElement extends Element {
  constructor() {
    super(...arguments);
    this.createdCallback && this.createdCallback();
  }

  // FIXME temporarily patch getAttribute
  // until https://github.com/1N50MN14/html-element/pull/32 lands
  getAttribute(n) {
    const attrObj = super.getAttribute(n);
    return attrObj && attrObj.value;
  }
}
global.HTMLElement = HTMLElement;

const registeredElements = {};

const originalCreateElement = Document.prototype.createElement;
Document.prototype.createElement = function(tagName) {
  tagName = tagName.toLowerCase();
  const customElProto = registeredElements[tagName];
  let el;
  if (customElProto) {
    el = new customElProto();
    el.nodeName = tagName;
  } else {
    el = originalCreateElement(...arguments);
  }
  return el;
}

Document.prototype.registerElement = function(tagName, proto) {
  tagName = tagName.toLowerCase();
  if (registeredElements[tagName]) {
    throw DOMException(`Registration failed for type '${tagName}'. A type with that name is already registered.`);
  } else {
    registeredElements[tagName] = proto;
  }
}
