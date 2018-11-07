import {Component, h} from '../../lib';


export class RouterApp extends Component {
  get config() {
    return {
      defaultState: {
        text: `Hello world`,
      },
      routes: {
        'foo': () => ({text: `Foobar!`}),
        '': () => ({text: `Default route!`}),
      },
      template: state => h(`p`, [state.text]),
    };
  }
}
customElements.define(`router-app`, RouterApp);

describe(`Router`, function() {
  beforeEach(function() {
    document.body.innerHTML = ``;
    window.location = `#`;

    this.routerApp = document.createElement(`router-app`);
    document.body.appendChild(this.routerApp);
  });

  it(`is not initialized when component has no routes defined`, function() {
    const simpleApp = document.createElement(`simple-app`);
    document.body.appendChild(simpleApp);
    expect(simpleApp).not.to.have.property(`router`);

    expect(this.routerApp.router).to.be.ok;
  });

  it(`is present when component has routes defined`, function() {
    expect(this.routerApp.router).to.be.ok;
  });
});
