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

describe(`Router`, function() {
  beforeEach(function() {
    document.body.innerHTML = ``;
    window.location = `#`;
  });

  it(`is only initialized when component has routes defined`, function() {
    const simpleApp = document.createElement(`simple-app`);
    document.body.appendChild(simpleApp);
    expect(simpleApp).not.to.have.property(`router`);
  });
});
