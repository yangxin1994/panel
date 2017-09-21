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
