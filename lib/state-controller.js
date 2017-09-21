/**
 * StateStore stores state and allows an observer to subscribe to state updates
 */
export class StateStore {
  constructor() {
    this._listeners = [];
    this._state = {};
  }

  get state() {
    return this._state;
  }

  update(props) {
    Object.assign(this._state, props);
    this._listeners.forEach(listener => listener());
  }

  subscribeUpdates(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter(l => l !== listener);
    };
  }
}

/**
 * A StateController's only duty is to control state.
 * Subclasses extend this and expose methods that call the controller's _update method
 * Controller will default create its own state store unless one is pass.
 * This allows multiple controllers to share parts of the state if needed
 */
export class StateController {
  constructor({store=null}={}) {
    // Create a default store if one isn't given
    this._store = store || new StateStore();
    this._update(this.defaultState);
  }

  get store() {
    return this._store;
  }

  get state() {
    return this.store.state;
  }

  get defaultState() {
    return {};
  }

  _update(props) { // Discourage external users from using state directly
    this.store.update(props);
  }
}
