import { View } from '../lib';
import expect from 'expect.js';
import h from 'virtual-dom/virtual-hyperscript';

describe('View instance', function() {
  class SampleView extends View {
    get TEMPLATE() {
      return state => h('.animal', `Hello ${state.animal}`);
    }
  }

  it('renders with given state', function() {
    const view = new SampleView();
    const vnode = view.render({animal: 'gerbil'});
    expect(vnode.properties.className).to.eql('animal');
    expect(vnode.children).to.have.length(1);
    expect(vnode.children[0].text).to.eql('Hello gerbil');
  });
});
