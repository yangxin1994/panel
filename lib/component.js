import MainLoop from 'main-loop';
import create from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import WebComponent from 'webcomponent';

export class Component extends WebComponent {
  attachedCallback() {
    this.state = Object.assign(
      {},
      this.initialState,
      this.getJSONAttribute('data-state'),
      this.stateFromAttributes()
    );
    this.loop = MainLoop(this.state, this.$template.bind(this), {create, diff, patch});
    this.appendChild(this.loop.target);
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
    Object.assign(this.state, stateUpdate);
    this.loop.update(this.state);
  }
}

export function registerComponent(tagName, klass) {
  document.registerElement(tagName, klass);
  return klass;
}
