const document = require('min-document');
const expect = require('expect.js');
const h = require('virtual-dom/virtual-hyperscript');
const panel = require('../build');

const windowStub = {
  addEventListener: () => {},
  history: {},
  location: {},
};

class SampleApp extends panel.App {
  get SCREENS() {
    return {hello: this.viewFromTemplate(state => h('div.hello'))};
  }
}

describe('panel (basic usage)', () => {
  it('renders to DOM after start() called', () => {
    const el = document.createElement('div');
    new SampleApp(el, {$screen: 'hello'}, {window: windowStub}).start();
    expect(el.childNodes).to.have.length(1);
    expect(el.childNodes[0].className).to.eql('hello');
  });

  it('does not render to DOM until start() called', () => {
    const el = document.createElement('div');
    new SampleApp(el, {$screen: 'hello'}, {window: windowStub});
    expect(el.childNodes).to.have.length(0);
  });
});
