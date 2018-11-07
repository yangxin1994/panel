import {nextAnimationFrame, retryable} from 'domsuite';

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
  beforeEach(async function() {
    document.body.innerHTML = ``;
    window.location = `#`;

    this.routerApp = document.createElement(`router-app`);
    document.body.appendChild(this.routerApp);

    await nextAnimationFrame();
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

  it(`runs index route handler when window location is empty`, function() {
    expect(this.routerApp.textContent).to.equal(`Default route!`);
  });

  it(`reacts to location hash changes`, async function() {
    window.location.hash = `#foo`;
    await nextAnimationFrame();
    await retryable(() => expect(this.routerApp.textContent).to.equal(`Foobar!`));
  });
});
