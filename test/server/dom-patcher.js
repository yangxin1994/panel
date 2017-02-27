import '../../lib/isorender/dom-shims';

import { expect } from 'chai';
import requestAnimationFrameCB from 'raf';

import { h } from '../../lib';
import DOMPatcher from '../../lib/dom-patcher';

const raf = () => new Promise(requestAnimationFrameCB);

describe('dom-patcher', function() {
  context('when first initialized', function() {
    const state = {foo: 'bar'};
    const domPatcher = new DOMPatcher(state, () => h('div'));

    it('applies initial state', function() {
      expect(domPatcher.state).to.eql(state);
    });

    it('copies the initial state', function() {
      expect(domPatcher.state).to.eql(state);
      expect(domPatcher.state).not.to.equal(state);
    });

    it('defaults to async mode');
  });

  context('in sync mode', function() {});

  context('in async mode', function() {});
});
