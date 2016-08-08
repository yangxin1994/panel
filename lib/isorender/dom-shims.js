import 'html-element'; // DOM shim
global.HTMLElement = Element;

const registeredElements = {};

Document.prototype.registerElement = function(tagName, proto) {
  if (registeredElements[tagName]) {
    throw DOMException(`Registration failed for type '${tagName}'. A type with that name is already registered.`);
  } else {
    registeredElements[tagName] = proto;
  }
}
