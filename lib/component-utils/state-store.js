/**
 * StateStore stores state and allows an observer to subscribe to state updates
 *
 * @template State
 */
class StateStore {
  constructor() {
    this._listeners = [];

    /** @type {State} */
    this._state = {};
  }

  /**
   * A readonly version of controller's state
   *
   * @readonly
   */
  get state() {
    return this._state;
  }

  /**
   * Update the state by passing in a property bag
   *
   * @param {Partial<State>} props
   */
  update(props) {
    // Always create a new state object.
    // if lastState === newState then state hasn't changed
    this._state = Object.assign({}, this._state, props);
    this._listeners.forEach(listener => listener(props));
  }

  /**
   * @internal Subscribe to state updates via a listener callback.
   * Only use for rendering and debugging purposes
   *
   * @param {(props: Partial<State>) => void} listener
   */
  subscribeUpdates(listener) {
    this._listeners.push(listener);
  }

  /**
   * @internal Unsubscribe the listener callback that was passed to subscribeUpdates
   *
   * @param {(props: Partial<State>) => void} listener
   */
  unsubscribeUpdates(listener) {
    this._listeners = this._listeners.filter(l => l !== listener);
  }
}

export default StateStore;
