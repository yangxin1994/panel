import StateStore from './state-store';

/**
 * A StateController manages state for an application or component
 * Subclasses extend this and expose methods that call the controller's _update method
 * Controller will default create its own state store unless one is passed.
 * StateController subclasses should only accept the dependencies they need via constructor
 * This means the dependencies can easily be mocked and unit tested
 *
 * @template State
 */
class StateController {
  /**
   * Create's a default store if one isn't given
   *
   * @param {Object} options
   * @param {StateStore<State>} options.store
   */
  constructor({store=null}={}) {
    this._store = store || new StateStore();
    this._update(this.defaultState);
  }

  /**
   * An initial default property bag for the controller's state implemented as get defaultState()
   *
   * @readonly
   */
  get defaultState() {
    return {};
  }

  /**
   * A readonly version of controller's state
   *
   * @readonly
   */
  get state() {
    return this._store.state;
  }

  /**
   * Discourage external users from using state directly
   *
   * @param {Partial<State>} props
   */
  _update(props) {
    this._store.update(props);
  }

  /**
   * @internal Subscribe to state updates via a listener callback.
   * panel component uses this to trigger dom update pipeline
   * Only use for rendering and debugging purposes
   *
   * @param {(props: Partial<State>) => void} listener
   */
  subscribeUpdates(listener) {
    return this._store.subscribeUpdates(listener);
  }

  /**
   * @internal Unsubscribe the listener callback that was passed to subscribeUpdates
   *
   * @param {(props: Partial<State>) => void} listener
   */
  unsubscribeUpdates(listener) {
    return this._store.unsubscribeUpdates(listener);
  }
}

export default StateController;
