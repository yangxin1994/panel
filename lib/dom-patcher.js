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
  constructor(initialState, renderFunc, options={}) {
    this.updateMode = options.updateMode || 'async';

    this.state = Object.assign({}, initialState);
    this.renderFunc = renderFunc;
    this.el = document.createElement('div');
    this.vnode = this.renderFunc(this.state);
    patch(this.el, this.vnode);
  }

  update(newState) {
    if (this.rendering) {
      console.error(`Applying new DOM update while render is already in progress!`);
    }

    this.pendingState = newState;
    switch (this.updateMode) {
      case 'async':
        if (!this.pending) {
          this.pending = true;
          requestAnimationFrame(() => this.render());
        }
        break;
      case 'sync':
        this.render();
        break;
    }
  }

  render() {
    this.rendering = true;

    this.pending = false;
    this.state = this.pendingState;
    const newVnode = this.renderFunc(this.state);
    patch(this.vnode, newVnode);
    this.vnode = newVnode;

    this.rendering = false;
  }
}
