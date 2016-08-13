import 'html-element'; // DOM shim

class HTMLElement extends Element {
  constructor() {
    super(...arguments);
    this.createdCallback && this.createdCallback();
  }
}
global.HTMLElement = HTMLElement;

const registeredElements = {};

const originalCreateElement = Document.prototype.createElement;
Document.prototype.createElement = function(tagName) {
  const customElProto = registeredElements[tagName];
  return customElProto ? new customElProto() : originalCreateElement(...arguments);
}

Document.prototype.registerElement = function(tagName, proto) {
  if (registeredElements[tagName]) {
    throw DOMException(`Registration failed for type '${tagName}'. A type with that name is already registered.`);
  } else {
    registeredElements[tagName] = proto;
  }
}
