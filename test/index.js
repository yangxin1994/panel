import { App } from '../lib';
import expect from 'expect.js';
import document from 'min-document';
import raf from 'raf';
import h from 'virtual-dom/virtual-hyperscript';

const windowStub = {
  addEventListener: () => {},
  history: {},
  location: {},
};

describe('renderer', function() {
  context('in basic usage', function() {
    class ConstantApp extends App {
      get SCREENS() {
        return {hello: this.viewFromTemplate(state => h('.hello'))};
      }
    }

    let el, app;

    beforeEach(function() {
      el = document.createElement('div');
      app = new ConstantApp(el, {$screen: 'hello'}, {window: windowStub});
    });

    it('updates DOM after start() called', function() {
      app.start();
      expect(el.childNodes).to.have.length(1);
      expect(el.childNodes[0].className).to.eql('hello');
    });

    it('does not update DOM until start() called', function() {
      expect(el.childNodes).to.have.length(0);
    });
  });

  context('with dynamic app state', function() {
    class StatefulApp extends App {
      get SCREENS() {
        return {hello: this.viewFromTemplate(state => h('.animal', `Hello ${state.animal}`))};
      }
    }

    let el, app;

    beforeEach(function() {
      el = document.createElement('div');
      app = new StatefulApp(el, {$screen: 'hello', animal: 'wombat'}, {window: windowStub});
      app.start();
    });

    it('injects app state into views', function() {
      expect(el.childNodes).to.have.length(1);
      const animalEl = el.childNodes[0]
      expect(animalEl.className).to.eql('animal');
      expect(animalEl.childNodes[0].data).to.eql('Hello wombat');
    });

    it('updates DOM after app state changes', function() {
      const animalEl = el.childNodes[0]
      expect(animalEl.className).to.eql('animal');
      expect(animalEl.childNodes[0].data).to.eql('Hello wombat');
      app.update({animal: 'llama'});
      raf(() => {
        expect(animalEl.childNodes[0].data).to.eql('Hello llama');
      });
    });

    it('does not update DOM before next repaint', function() {
      const animalEl = el.childNodes[0]
      expect(animalEl.className).to.eql('animal');
      expect(animalEl.childNodes[0].data).to.eql('Hello wombat');
      app.update({animal: 'llama'});
      expect(animalEl.childNodes[0].data).to.eql('Hello wombat');
    });
  });

});
