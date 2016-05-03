import MainLoop from 'main-loop';
import create from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import h from 'virtual-dom/virtual-hyperscript';
import WebComponent from 'webcomponent';

import Router from './router';

let panelID = 1;

export default class Component extends WebComponent {
  createdCallback() {
    this.panelID = panelID++;
  }

  attachedCallback() {
    this.$panelChildren = new Set();

    const parentID = Number(this.getAttribute('panel-parent'));
    if (parentID) {
      this.isPanelChild = true;
      // find $panelParent
      for (let el = this.parentElement; el && !this.$panelParent; el = el.parentElement) {
        if (el.panelID === parentID) {
          this.$panelParent = el;
          this.$panelRoot = el.$panelRoot;
        }
      }
      if (!this.$panelParent) {
        throw `panel-parent ${parentID} not found`;
      }
      this.$panelParent.$panelChildren.add(this);
      this.state = this.$panelRoot.state;
    } else {
      this.isPanelRoot = true;
      this.$panelRoot = this;
      this.state = {};
      this.router = new Router(this, {historyMethod: this.historyMethod});
    }

    Object.assign(
      this.state,
      this.$defaultState,
      this.getJSONAttribute('data-state'),
      this._stateFromAttributes()
    );

    this.loop = MainLoop(this.state, this._render.bind(this), {create, diff, patch});
    this.appendChild(this.loop.target);

    if (Object.keys(this.$routes).length) {
      this.navigate(window.location.hash);
    }
  }

  detachedCallback() {
    this.$panelParent && this.$panelParent.$panelChildren.delete(this);
  }

  child(tagName, attrs={}) {
    attrs = Object.assign({}, attrs);
    attrs.attributes = Object.assign({}, attrs.attributes, {'panel-parent': this.panelID});
    return h(tagName, attrs);
  }

  navigate() {
    this.$panelRoot.router.navigate(...arguments);
  }

  get $routes() {
    return {};
  }

  update(stateUpdate={}) {
    if (this.isPanelRoot) {
      const updateHash = '$fragment' in stateUpdate && stateUpdate.$fragment !== this.state.$fragment;

      Object.assign(this.state, stateUpdate);
      this.updateSelfAndChildren(this.state);

      if (updateHash) {
        this.router.replaceHash(this.state.$fragment);
      }
    } else {
      this.$panelRoot.update(stateUpdate);
    }
  }

  updateSelfAndChildren(state) {
    this.loop.update(state);
    for (let child of this.$panelChildren) {
      child.updateSelfAndChildren(state);
    }
  }

  _render(state) {
    if (this.$view && this.$view !== state.$view) {
      return h('div');
    } else {
      return this.$template(Object.assign({}, state, {$component: this}));
    }
  }

  _stateFromAttributes() {
    let state = {};

    // this.attributes is a NamedNodeMap, without normal iterators
    for (let ai = 0; ai < this.attributes.length; ai++) {
      let attr = this.attributes[ai];
      let attrMatch = attr.name.match(/^state-(.+)/);
      if (attrMatch) {
        let num = Number(attr.value);
        state[attrMatch[1]] = isNaN(num) ? attr.value : num;
      }
    }

    return state;
  }
}
