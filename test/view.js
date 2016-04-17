import { App, View } from '../lib';
import expect from 'expect.js';
import h from 'virtual-dom/virtual-hyperscript';

const windowStub = {
  addEventListener: () => {},
  history: {},
  location: {},
};

describe('View instance', function() {
  class StubApp extends App {
    get SCREENS() { return {}; }
  }

  let stubApp;

  beforeEach(function() {
    stubApp = new StubApp(null, {}, {window: windowStub});
  });

  it('renders with given state', function() {
    class SampleView extends View {
      get TEMPLATE() {
        return state => h('.animal', `Hello ${state.animal}`);
      }
    }

    const view = new SampleView(stubApp);
    const vnode = view.render({animal: 'gerbil'});
    expect(vnode.properties.className).to.eql('animal');
    expect(vnode.children).to.have.length(1);
    expect(vnode.children[0].text).to.eql('Hello gerbil');
  });

  it('can render subviews', function() {
    class ViewWithChildren extends View {
      get VIEWS() {
        return {
          Foo: this.viewFromTemplate(state => h('.foo', `Foo ${state.name}`)),
          Bar: this.viewFromTemplate(state => h('.bar', `Bar ${state.name}`)),
        }
      }

      get TEMPLATE() {
        return state => h('.parent-view', [
          state.views.Foo(state),
          state.views.Bar(state),
        ]);
      }
    }

    const view = new ViewWithChildren(stubApp);
    const vnode = view.render({name: 'Ariadne'});
    expect(vnode.properties.className).to.eql('parent-view');
    expect(vnode.children).to.have.length(2);
    expect(vnode.children[0].children[0].text).to.eql('Foo Ariadne');
    expect(vnode.children[1].children[0].text).to.eql('Bar Ariadne');
  });

  it('can group subviews in arrays', function() {
    class ViewWithArrayChildren extends View {
      get VIEWS() {
        return {
          Foo: this.viewFromTemplate(state => h('.foo', `Foo ${state.name}`)),
          MyList: [
            this.viewFromTemplate(state => h('.bar', `Bar ${state.name}`)),
            this.viewFromTemplate(state => h('.baz', `Baz ${state.name}`)),
          ],
        }
      }

      get TEMPLATE() {
        return state => h('.parent-view', [
          state.views.Foo(state),
          h('.list', state.views.MyList.map(view => view(state))),
        ]);
      }
    }

    const view = new ViewWithArrayChildren(stubApp);
    const vnode = view.render({name: 'Ariadne'});
    expect(vnode.properties.className).to.eql('parent-view');
    expect(vnode.children).to.have.length(2);
    expect(vnode.children[0].children[0].text).to.eql('Foo Ariadne');

    const listNode = vnode.children[1];
    expect(listNode.properties.className).to.eql('list');
    expect(listNode.children).to.have.length(2);
    expect(listNode.children[0].children[0].text).to.eql('Bar Ariadne');
    expect(listNode.children[1].children[0].text).to.eql('Baz Ariadne');
  });

  it('can group subviews in objects', function() {
    class ViewWithObjectChildren extends View {
      get VIEWS() {
        return {
          Foo: this.viewFromTemplate(state => h('.foo', `Foo ${state.name}`)),
          MyObj: {
            Bar: this.viewFromTemplate(state => h('.bar', `Bar ${state.name}`)),
            Baz: this.viewFromTemplate(state => h('.baz', `Baz ${state.name}`)),
          },
        }
      }

      get TEMPLATE() {
        return state => h('.parent-view', [
          state.views.Foo(state),
          h('.map', [
            state.views.MyObj.Bar(state),
            state.views.MyObj.Baz(state),
          ]),
        ]);
      }
    }

    const view = new ViewWithObjectChildren(stubApp);
    const vnode = view.render({name: 'Ariadne'});
    expect(vnode.properties.className).to.eql('parent-view');
    expect(vnode.children).to.have.length(2);
    expect(vnode.children[0].children[0].text).to.eql('Foo Ariadne');

    const listNode = vnode.children[1];
    expect(listNode.properties.className).to.eql('map');
    expect(listNode.children).to.have.length(2);
    expect(listNode.children[0].children[0].text).to.eql('Bar Ariadne');
    expect(listNode.children[1].children[0].text).to.eql('Baz Ariadne');
  });

  it('can nest subview groups', function() {
    class ViewWithNestedChildGroups extends View {
      get VIEWS() {
        return {
          Foo: this.viewFromTemplate(state => h('.foo', `Foo ${state.name}`)),
          MyList: [
            {qux: this.viewFromTemplate(state => h('.bar', `Bar ${state.name}`))},
            {qux: this.viewFromTemplate(state => h('.baz', `Baz ${state.name}`))},
          ],
        }
      }

      get TEMPLATE() {
        return state => h('.parent-view', [
          state.views.Foo(state),
          h('.list', state.views.MyList.map(obj => obj.qux(state))),
        ]);
      }
    }

    const view = new ViewWithNestedChildGroups(stubApp);
    const vnode = view.render({name: 'Ariadne'});
    expect(vnode.properties.className).to.eql('parent-view');
    expect(vnode.children).to.have.length(2);
    expect(vnode.children[0].children[0].text).to.eql('Foo Ariadne');

    const listNode = vnode.children[1];
    expect(listNode.properties.className).to.eql('list');
    expect(listNode.children).to.have.length(2);
    expect(listNode.children[0].children[0].text).to.eql('Bar Ariadne');
    expect(listNode.children[1].children[0].text).to.eql('Baz Ariadne');
  });
});
