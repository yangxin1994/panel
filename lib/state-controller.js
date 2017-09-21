/**
 * A StateController's only duty is to control state.
 * Subclasses extend this and expose methods to
 */
export default class StateController {
  constructor() {
    this.listeners = [];
    this.resetState();
  }

  get defaultState() {
    return {};
  }

  get state() {
    return this._state;
  }

  resetState() {
    this._state = this.defaultState;
  }

  _update(props) { // Discourage calling _update externally
    Object.assign(this._state, props);
    this._notifyListeners();
  }

  _notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  subscribeUpdates(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}
