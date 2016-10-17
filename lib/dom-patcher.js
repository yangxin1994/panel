import snabbdom from 'snabbdom';
import h from 'snabbdom/h';

import snabbAttributes      from 'snabbdom/modules/attributes';
import snabbClass           from 'snabbdom/modules/class';
import snabbDataset         from 'snabbdom/modules/dataset';
import snabbEventlisterners from 'snabbdom/modules/eventlisteners';
import snabbProps           from 'snabbdom/modules/props';
import snabbStyle           from 'snabbdom/modules/style';
const patch = snabbdom.init([
  snabbAttributes,
  snabbClass,
  snabbDataset,
  snabbEventlisterners,
  snabbProps,
  snabbStyle,
]);

export default class DOMPatcher {
  constructor(initialState, renderFunc) {
    this.state = Object.assign({}, initialState);
    this.renderFunc = renderFunc;
    this.el = document.createElement('div');
    this.vnode = this.renderFunc(this.state);
    patch(this.el, this.vnode);
  }

  // TODO async or sync update modes
  update(newState) {
    this.state = newState;
    const newVnode = this.renderFunc(this.state);
    patch(this.vnode, newVnode);
    this.vnode = newVnode;
  }
}
