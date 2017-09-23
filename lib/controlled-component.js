import Component from './component';
import {EMPTY_DIV} from './dom-patcher';

export default class ControlledComponent extends Component {
  createdCallback() {
    super.createdCallback(...arguments);
    this.controller = this.getConfig(`controller`);
    if (!this.controller) {
      throw Error(`"controller" must be set in config of a ControlledComponent`);
    }
    // Don't allow component's update directly
    this._update = this.update;
    this.update = () => { throw new Error(`update() not allowed from component. Use controller`); };
    this._unsubscribeUpdates = this.controller.subscribeUpdates(() => this._update());
  }

  detachedCallback() {
    super.detachedCallback();
    this._unsubscribeUpdates();
    this._lastState = null; // No dangling references when cleaning up
  }

  attributeChangedCallback() {
    // Do nothing, component should explicitly pass this to controller for an update
    // Super class calls this.update() which will throw an error
  }

  // Don't render if state hasn't changed since controlled components return immutable state
  shouldUpdate(newState) {
    if (this._lastState !== newState) {
      this._lastState = newState;
      return true;
    }

    return false;
  }

  _render() {
    if (this.shouldUpdate(this.controller.state)) {
      try {
        // Pass in $controller to jade.
        // Template should use something like $controller.getDisplayX() to get the state it needs
        this._rendered = this.getConfig(`template`)({
          $component: this,
          $helpers: this.helpers,
          $controller: this.controller,
        });
      } catch (e) {
        this.logError(`Error while rendering ${this.toString()}`, this, e.stack);
      }
    }
    return this._rendered || EMPTY_DIV;
  }
}
