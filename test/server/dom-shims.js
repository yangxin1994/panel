import '../../lib/isorender/dom-shims';

import sinon from 'sinon';
import {expect} from 'chai';

import nextAnimationFrame from './nextAnimationFrame';
import {SimpleApp} from '../fixtures/simple-app';
import {ShadowDomApp} from '../fixtures/shadow-dom-app';

customElements.define(`my-app`, SimpleApp);
customElements.define(`shadow-dom-app`, ShadowDomApp);

describe(`customElements registry`, function () {
  describe(`.get()`, function () {
    it(`returns component class`, function () {
      expect(customElements.get(`my-app`)).to.equal(SimpleApp);
    });
  });

  describe(`.define()`, function () {
    it(`throws an error if called twice with the same tag name`, function () {
      expect(() => customElements.define(`my-app`, SimpleApp)).to.throw(
        `Registration failed for type 'my-app'. A type with that name is already registered.`,
      );
    });
  });
});

describe(`customElement with shadowDom`, function () {
  it(`el contains shadow-root`, function () {
    const elem = document.createElement(`shadow-dom-app`);
    expect(elem.el.tagName).to.equal(`shadow-root`);
    expect(elem.el).to.equal(elem.shadowRoot);
  });

  it(`renders component`, async function () {
    const elem = document.createElement(`shadow-dom-app`);
    elem.connectedCallback();
    await nextAnimationFrame();

    expect(elem.el.innerHTML).to.equal(`<style>color: blue;</style><div class="foo"><p>Hello</p></div>`);
  });
});

describe(`customElement callbacks`, function () {
  it(`calls connectedCallback and disconnectedCallback when adding/removing from DOM`, async function () {
    const elem = document.createElement(`my-app`);
    const connectedCallbackSpy = sinon.spy(elem, `connectedCallback`);
    const disconnectedCallbackSpy = sinon.spy(elem, `disconnectedCallback`);

    expect(elem.isConnected).to.be.falsy;

    // fake adding to DOM
    const parent = document.createElement(`div`);
    parent.appendChild(elem);

    await nextAnimationFrame();
    expect(connectedCallbackSpy.called).to.be.true;
    expect(elem.isConnected).to.be.true;

    parent.removeChild(elem);
    expect(disconnectedCallbackSpy.called).to.be.true;
  });

  it(`calls attributeChangedCallback when adding/removing attributes`, function () {
    const elem = document.createElement(`attrs-reflection-app`);
    const attributeChangedCallbackSpy = sinon.spy(elem, `attributeChangedCallback`);

    elem.connectedCallback();

    elem.setAttribute(`str-attr`, `hello`);
    expect(elem.hasAttribute(`str-attr`)).to.be.true;
    expect(attributeChangedCallbackSpy.calledWith(`str-attr`, null, `hello`)).to.be.true;

    elem.removeAttribute(`str-attr`);
    expect(elem.hasAttribute(`str-attr`)).to.be.false;
    expect(attributeChangedCallbackSpy.calledWith(`str-attr`, `hello`, null)).to.be.true;
  });
});
