import { App } from '../lib';
import expect from 'expect.js';
import document from 'min-document';
import h from 'virtual-dom/virtual-hyperscript';

const windowStub = {
  addEventListener: () => {},
  history: {},
  location: {},
};

describe('renderer', () => {
  context('in basic usage', () => {
    class ConstantApp extends App {
      get SCREENS() {
        return {hello: this.viewFromTemplate(state => h('div.hello'))};
      }
    }

    it('updates DOM after start() called', () => {
      const el = document.createElement('div');
      new ConstantApp(el, {$screen: 'hello'}, {window: windowStub}).start();
      expect(el.childNodes).to.have.length(1);
      expect(el.childNodes[0].className).to.eql('hello');
    });

    it('does not update DOM until start() called', () => {
      const el = document.createElement('div');
      new ConstantApp(el, {$screen: 'hello'}, {window: windowStub});
      expect(el.childNodes).to.have.length(0);
    });
  });

  context('with dynamic app state', () => {
    class StatefulApp extends App {
      get SCREENS() {
        return {hello: this.viewFromTemplate(state => h('div.animal', `Hello ${state.animal}`))};
      }
    }

    it('injects app state into views', () => {
      const el = document.createElement('div');
      new StatefulApp(el, {$screen: 'hello', animal: 'wombat'}, {window: windowStub}).start();
      expect(el.childNodes).to.have.length(1);
      const animalEl = el.childNodes[0]
      expect(animalEl.className).to.eql('animal');
      expect(animalEl.childNodes[0].data).to.eql('Hello wombat');
    });
  });

});
