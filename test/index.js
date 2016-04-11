import { App } from '../build';
import expect from 'expect.js';
import document from 'min-document';
import h from 'virtual-dom/virtual-hyperscript';

const windowStub = {
  addEventListener: () => {},
  history: {},
  location: {},
};

class SampleApp extends App {
  get SCREENS() {
    return {hello: this.viewFromTemplate(state => h('div.hello'))};
  }
}

describe('renderer', () => {
  it('updates DOM after start() called', () => {
    const el = document.createElement('div');
    new SampleApp(el, {$screen: 'hello'}, {window: windowStub}).start();
    expect(el.childNodes).to.have.length(1);
    expect(el.childNodes[0].className).to.eql('hello');
  });

  it('does not update DOM until start() called', () => {
    const el = document.createElement('div');
    new SampleApp(el, {$screen: 'hello'}, {window: windowStub});
    expect(el.childNodes).to.have.length(0);
  });
});
