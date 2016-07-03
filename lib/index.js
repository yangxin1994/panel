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
import h from 'virtual-dom/virtual-hyperscript';

export {

  /** {@link Component} class, to be subclassed by apps */
  Component,

  /**
   * [virtual-dom]{@link https://github.com/Matt-Esch/virtual-dom} function to create Hyperscript nodes,
   * exported here for user convenience
   */
  h,
};
