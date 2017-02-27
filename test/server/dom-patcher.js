import '../../lib/isorender/dom-shims';

import { expect } from 'chai';
import requestAnimationFrameCB from 'raf';

import { h } from '../../lib';
import DOMPatcher from '../../lib/dom-patcher';

const raf = () => new Promise(requestAnimationFrameCB);

describe('dom-patcher', function() {
  context('when first initialized', function() {
    const domPatcher = new DOMPatcher({foo: 'bar'}, () => h('div'));

    it('applies initial state', function() {
      expect(domPatcher.state).to.eql({foo: 'bar'});
    });

    it('copies the initial state');
  });
});
