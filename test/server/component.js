import '../../lib/isorender/dom-shims';

import { expect } from 'chai';
import requestAnimationFrame from 'raf';

import { SimpleApp } from '../fixtures/simple-app';
document.registerElement('simple-app', SimpleApp);

describe('Server-side component renderer', function() {
  it('can register and create components with document.createElement', function() {
    const el = document.createElement('simple-app');
    expect(el.state).to.eql({});
    el.attachedCallback();
    expect(el.state).to.eql({foo: 'bar'});
  });

  it('supports class instantiation', function() {
    const el = new SimpleApp();
    expect(el.state).to.eql({});
    el.attachedCallback();
    expect(el.state).to.eql({foo: 'bar'});
  });

  it('renders a simple component', function(done) {
    const el = new SimpleApp();
    el.attachedCallback();
    requestAnimationFrame(function() {
      const html = el.innerHTML;
      expect(html).to.contain('<DIV class="foo">');
      expect(html).to.contain('Value of foo: bar');
      expect(html).to.contain('Foo capitalized: Bar');
      done();
    });
  });

  it('renders updates', function(done) {
    const el = new SimpleApp();
    el.attachedCallback();
    requestAnimationFrame(function() {
      expect(el.textContent).to.contain('Value of foo: bar');
      expect(el.textContent).to.contain('Foo capitalized: Bar');
      el.update({foo: 'new value'});
      requestAnimationFrame(function() {
        expect(el.textContent).to.contain('Value of foo: new value');
        expect(el.textContent).to.contain('Foo capitalized: New value');
        done();
      });
    });
  });
});
