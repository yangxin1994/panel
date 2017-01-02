// TODO replace snabbdom-tdumitrescu with mainline snabbdom
// once current master (>0.5.4) is published
import snabbdom from 'snabbdom-tdumitrescu';
import h from 'snabbdom-tdumitrescu/h';

import snabbAttributes      from 'snabbdom-tdumitrescu/modules/attributes';
import snabbDataset         from 'snabbdom-tdumitrescu/modules/dataset';
import snabbDelayedClass    from 'snabbdom-delayed-class';
import snabbEventlisterners from 'snabbdom-tdumitrescu/modules/eventlisteners';
import snabbProps           from 'snabbdom-tdumitrescu/modules/props';
import snabbStyle           from 'snabbdom-tdumitrescu/modules/style';

const patch = snabbdom.init([
  snabbAttributes,
  snabbDataset,
  snabbDelayedClass,
  snabbEventlisterners,
  snabbProps,
  snabbStyle,
]);

export default class DOMPatcher {
  constructor(initialState, renderFunc, options={}) {
    this.updateMode = options.updateMode || 'async';

    this.state = Object.assign({}, initialState);
    this.renderFunc = renderFunc;
    this.vnode = this.renderFunc(this.state);
    const tagName = this.vnode.sel.split(/[#\.]/)[0];
    this.el = document.createElement(tagName);
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
