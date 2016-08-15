import '../../lib/isorender/dom-shims';

import { expect } from 'chai';
import requestAnimationFrameCB from 'raf';

import { SimpleApp } from '../fixtures/simple-app';
document.registerElement('simple-app', SimpleApp);

const requestAnimationFrame = () => new Promise(requestAnimationFrameCB);

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

  it('renders a simple component', async function() {
    const el = new SimpleApp();
    el.attachedCallback();

    await requestAnimationFrame();

    const html = el.innerHTML;
    expect(html).to.contain('<DIV class="foo">');
    expect(html).to.contain('Value of foo: bar');
    expect(html).to.contain('Foo capitalized: Bar');
  });

  it('renders updates', async function() {
    const el = new SimpleApp();
    el.attachedCallback();

    await requestAnimationFrame();

    expect(el.textContent).to.contain('Value of foo: bar');
    expect(el.textContent).to.contain('Foo capitalized: Bar');
    el.update({foo: 'new value'});

    await requestAnimationFrame();

    expect(el.textContent).to.contain('Value of foo: new value');
    expect(el.textContent).to.contain('Foo capitalized: New value');
  });
});
