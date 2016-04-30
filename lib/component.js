import MainLoop from 'main-loop';
import create from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import h from 'virtual-dom/virtual-hyperscript';
import WebComponent from 'webcomponent';

export class Component extends WebComponent {
  attachedCallback() {
    // find $panelRoot
    for (let el = this.parentElement; el && !this.$panelRoot; el = el.parentElement) {
      if (el.$panelRoot) {
        this.$panelRoot = el.$panelRoot;
      }
    }

    // share state between root and children
    if (!this.$panelRoot) {
      this.$panelRoot = this;
      this.state = {};
    } else {
      this.state = this.$panelRoot.state;
    }
    Object.assign(
      this.state,
      this.$defaultState,
      this.getJSONAttribute('data-state'),
      this.stateFromAttributes()
    );

    this.loop = MainLoop(this.state, this._render.bind(this), {create, diff, patch});
    this.appendChild(this.loop.target);
  }

  isPanelRoot() {
    return this.$panelRoot === this;
  }

  shouldDisplay() {
    return true;
  }

  stateFromAttributes() {
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

  update(stateUpdate={}) {
    if (this.isPanelRoot()) {
      Object.assign(this.state, stateUpdate);
      updateNodeAndChildren(this, this.state);
    } else {
      this.$panelRoot.update(stateUpdate);
    }
  }

  _render(state) {
    return this.shouldDisplay() ? this.$template(state) : h('div');
  }
}

function updateNodeAndChildren(el, state) {
  if (el.$panelRoot) {
    el.loop.update(state);
  }
  for (let ei = 0; ei < el.children.length; ei++) {
    updateNodeAndChildren(el.children[ei], state);
  }
}

export function registerComponent(tagName, klass) {
  document.registerElement(tagName, klass);
  return klass;
}
