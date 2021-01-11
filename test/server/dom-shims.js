/* eslint-env mocha */
/* eslint-disable no-unused-expressions */ // complains about .to.be.ok
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
  });

  it(`renders component`, async function () {
    const elem = document.createElement(`shadow-dom-app`);
    elem.connectedCallback();
    await nextAnimationFrame();

    expect(elem.el.innerHTML).to.equal(`<style>color: blue;</style><div class="foo"><p>Hello</p></div>`);
  });
});

describe(`appending customElements to DOM`, function () {
  it(`calls connectedCallback on customElements when using appendChild`, async function () {
    const elem = document.createElement(`my-app`);
    const connectedCallbackStub = sinon.stub(elem, `connectedCallback`);

    document.createElement(`div`).appendChild(elem);

    await nextAnimationFrame();
    expect(connectedCallbackStub.called).to.be.true;
    expect(elem.isConnected).to.be.true;
  });
});
