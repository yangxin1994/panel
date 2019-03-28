/**
 * Manages Virtual DOM -> DOM rendering cycle
 * @module dom-patcher
 * @private
 */

import snabbdom from 'snabbdom';
import h from 'snabbdom/h';

import snabbAttributes from 'snabbdom/modules/attributes';
import snabbDataset from 'snabbdom/modules/dataset';
import snabbDelayedClass from 'snabbdom-delayed-class';
import snabbEventlisterners from 'snabbdom/modules/eventlisteners';
import snabbProps from 'snabbdom/modules/props';
import snabbStyle from 'snabbdom/modules/style';

const patch = snabbdom.init([
  snabbAttributes,
  snabbDataset,
  snabbDelayedClass,
  snabbEventlisterners,
  snabbProps,
  snabbStyle,
]);

export const EMPTY_DIV = h(`div`);
export {h};

export class DOMPatcher {
  constructor(initialState, renderFunc, options={}) {
    this.updateMode = options.updateMode || `async`;

    this.state = Object.assign({}, initialState);
    this.renderFunc = renderFunc;
    this.vnode = this.renderFunc(this.state);

    // prepare root element
    const tagName = this.vnode.sel.split(/[#.]/)[0];
    const classMatches = this.vnode.sel.match(/\.[^.#]+/g);
    const idMatch = this.vnode.sel.match(/#[^.#]+/);
    this.el = document.createElement(tagName);
    if (classMatches) {
      this.el.className = classMatches.map(c => c.slice(1)).join(` `);
    }
    if (idMatch) {
      this.el.id = idMatch[0].slice(1);
    }

    patch(this.el, this.vnode);
  }

  update(newState) {
    if (this.rendering) {
      console.error(`Applying new DOM update while render is already in progress!`);
    }

    this.pendingState = newState;
    switch (this.updateMode) {
      case `async`:
        if (!this.pending) {
          this.pending = true;
          // both Promise and requestAnimationFrame are async
          // Promise is a microtask and gets called as soon as current call stack is empty
          // requestAnimationFrame is about ~16ms delay and gets called after a frame is rendered
          // waiting for requestAnimationFrame means browser does an unnecessary layout and paint.
          // Promise keeps it async, but only a single layout and paint happens
          // after all nested components have updated
          new Promise(resolve => resolve()).then(() => this.render());
        }
        break;
      case `sync`:
        this.render();
        break;
    }
  }

  render() {
    this.rendering = true;
    this.pending = false;
    this.state = this.pendingState;
    const newVnode = this.renderFunc(this.state);
    this.rendering = false;

    patch(this.vnode, newVnode);
    this.vnode = newVnode;
  }
}
