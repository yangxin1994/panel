/**
 * Optional component wrappers and utilities for state management;
 * exported in the main {@link panel} module for convenience.
 * @module component-utils
 * @example
 * // direct top-level import
 * import {ProxyComponent, StateController} from 'panel';
 * // module import
 * import {ComponentUtils} from 'panel';
 * const {ProxyComponent, StateController} = ComponentUtils;
 */

import ControlledComponent from './controlled-component';
import ProxyComponent from './proxy-component';
import StateController from './state-controller';
import StateStore from './state-store';

export default {
  /** {@link ControlledComponent} class, to be subclassed by apps */
  ControlledComponent,

  /** {@link ProxyComponent} class, to be subclassed by apps */
  ProxyComponent,

  /** {@link StateController} class, to be subclassed by apps */
  StateController,

  /** A simple subscribable state store */
  StateStore,
};
