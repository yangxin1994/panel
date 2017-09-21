import Component from './component';
import {EMPTY_DIV} from './dom-patcher';

export default class ControlledComponent extends Component {
  createdCallback() {
    super.createdCallback(...arguments);
    this.controller = this.getConfig(`controller`);
    if (!this.controller) {
      throw Error(`"controller" must be set in config of a ControlledComponent`);
    }
    this._update = this.update;
    this.update = () => { throw new Error(`update() not allowed from component. Use controller`); };
    this._unsubscribeUpdates = this.controller.store.subscribeUpdates(() => this._update());
  }

  detachedCallback() {
    super.detachedCallback();
    this._unsubscribeUpdates();
  }

  attributeChangedCallback() {
    // Do nothing, component should explicitly pass this to controller for an update
  }

  _render() {
    try {
      this._rendered = this.getConfig(`template`)({
        $component: this,
        $helpers: this.helpers,
        $controller: this.controller,
      });
    } catch (e) {
      this.logError(`Error while rendering ${this.toString()}`, this, e.stack);
    }
    return this._rendered || EMPTY_DIV;
  }
}
