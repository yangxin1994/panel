import MainLoop from 'main-loop';
import create from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import WebComponent from 'webcomponent';

export class Component extends WebComponent {
  attachedCallback() {
    this.state = Object.assign({}, this.initialState, this.getJSONAttribute('data-state'));
    this.loop = MainLoop(this.state, this.template, {create, diff, patch});
    this.appendChild(this.loop.target);
  }

  update(stateUpdate={}) {
    Object.assign(this.state, stateUpdate);
    this.loop.update(this.state);
  }
}

export function registerComponent(klass) {
  document.registerElement(klass.tagName, klass);
  return klass;
}
