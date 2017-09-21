import StateStore from './state-store';

/**
 * A StateController's only duty is to control state.
 * Subclasses extend this and expose methods that call the controller's _update method
 * Controller will default create its own state store unless one is passed.
 * StateController subcalsses should only accept the dependencies they need via constructor
 * This means the dependencies can easily be mocked in unit test mode
 */
export default class StateController {
  // Create's a default store if one isn't given
  constructor({store=null}={}) {
    this._store = store || new StateStore();
    this._update(this.defaultState);
  }

  get defaultState() {
    return {};
  }

  get state() {
    return this._store.state;
  }

  // Discourage external users from using state directly
  _update(props) {
    this._store.update(props);
  }

  subscribeUpdates(listener) {
    return this._store.subscribeUpdates(listener);
  }
}
