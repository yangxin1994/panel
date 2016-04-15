import { App, View } from '../lib';
import expect from 'expect.js';
import h from 'virtual-dom/virtual-hyperscript';

describe('View instance', function() {
  it('renders with given state', function() {
    class SampleView extends View {
      get TEMPLATE() {
        return state => h('.animal', `Hello ${state.animal}`);
      }
    }

    const view = new SampleView();
    const vnode = view.render({animal: 'gerbil'});
    expect(vnode.properties.className).to.eql('animal');
    expect(vnode.children).to.have.length(1);
    expect(vnode.children[0].text).to.eql('Hello gerbil');
  });

  it('can render subviews', function() {
    class ViewWithChildren extends View {
      get VIEWS() {
        return {
          Foo: App.viewFromTemplate(state => h('.foo', `Foo ${state.name}`)),
          Bar: App.viewFromTemplate(state => h('.bar', `Bar ${state.name}`)),
        }
      }

      get TEMPLATE() {
        return state => h('.parent-view', [
          state.views.Foo(state),
          state.views.Bar(state),
        ]);
      }
    }

    const view = new ViewWithChildren();
    const vnode = view.render({name: 'Ariadne'});
    expect(vnode.properties.className).to.eql('parent-view');
    expect(vnode.children).to.have.length(2);
    expect(vnode.children[0].children[0].text).to.eql('Foo Ariadne');
    expect(vnode.children[1].children[0].text).to.eql('Bar Ariadne');
  });
});
