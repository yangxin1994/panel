import '../../lib/isorender/dom-shims';

import { expect } from 'chai';

import '../fixtures';

describe('Server-side component renderer', function() {
  it('can register and create components with document.createElement', function() {
    const el = document.createElement('simple-app');
    expect(el.state).to.eql({});
    el.attachedCallback();
    expect(el.state).to.eql({foo: 'bar'});
  });
});
