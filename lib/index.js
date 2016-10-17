/**
 * Entry point for Panel apps and components
 * @module panel
 * @example
 * import { Component } from 'panel';
 * document.registerElement('my-widget', class extends Component {
 *   // app definition
 * });
 */

import Component from './component';
import h from 'snabbdom/h';

export {

  /** {@link Component} class, to be subclassed by apps */
  Component,

  /**
   * [snabbdom]{@link https://github.com/snabbdom/snabbdom} function to create Hyperscript nodes,
   * exported here for user convenience
   */
  h,
};
