import {Component, ConfigOptions} from '../../lib';
import {ContextAlpha, ContextAlphaImpl, ContextBravo} from './simple-contexts';

interface TestContextRegistry {
  alpha: ContextAlpha;
  bravo: ContextBravo;
}

export class ContextAlphaWidget extends Component<any, any, any, any, TestContextRegistry> {
  config: ConfigOptions<any, any, {
    alpha: ContextAlphaImpl;
  }>;
}
