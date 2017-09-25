/**
 * StateStore stores state and allows an observer to subscribe to state updates
 */
export default class StateStore {
  constructor() {
    this._listeners = [];
    this._state = {};
  }

  get state() {
    return this._state;
  }

  update(props) {
    // Always create a new state object.
    // if lastState === newState then state hasn't changed
    this._state = Object.assign({}, this._state, props);
    this._listeners.forEach(listener => listener(props));
  }

  subscribeUpdates(listener) {
    this._listeners.push(listener);
  }

  unsubscribeUpdates(listener) {
    this._listeners = this._listeners.filter(l => l !== listener);
  }
}
