import 'html-element'; // DOM shim
global.HTMLElement = Element;

Document.prototype.registerElement = function(tagName, proto) {
  console.log(`registering ${tagName}`);
}
