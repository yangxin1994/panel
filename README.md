[![Build Status](https://travis-ci.org/mixpanel/panel.svg?branch=master)](https://travis-ci.org/mixpanel/panel)
# panel

Apps made of composable, manageable Web Components. Because coding UIs shouldn't be rocket science.

```javascript
import {Component} from 'panel';
import counterTemplate from './counter.jade';

document.registerElement('counter-app', class extends Component {
  get $defaultState() {
    return {count: 1};
  }

  get $template() {
    return counterTemplate;
  }

  get handlers() {
    return {
      incr: () => this.update({count: this.state.count + 1}),
      decr: () => this.update({count: this.state.count - 1}),
    }
  }
});

document.body.appendChild(document.createElement('counter-app'));
```
```jade
.counter
  .val Counter: #{count}
  .controls
    button.decr(onclick=$component.handlers.decr) -
    button.incr(onclick=$component.handlers.incr) +
```

## Motivation and technologies

Panel makes [Web Components](http://webcomponents.org/) suitable for constructing full web UIs, not just low-level building blocks. It does so by providing an easy-to-use state management and rendering layer built on [virtual-dom](https://github.com/Matt-Esch/virtual-dom), modeled on the core rendering technology of [React](https://facebook.github.io/react/).

Each Panel application is a Web Component, composed of DOM elements and potentially arbitrarily nested child components, each of which is technically an app in its own right. Parent and child components can share `state`, in the form of Plain Old JavaScript Objects which are passed to templates for rendering. When `update()` is called on a component with state changes, the DOM gets updated according to the diff. Templates can be in any format that produces [(virtual-)hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript), including raw Hyperscript code or Jade or JSX.

The architecture of Panel draws upon aspects of and technologies from [Mercury](https://github.com/Raynos/mercury), [Polymer](https://www.polymer-project.org), [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/), [Cycle](http://cycle.js.org/), and [Backbone](http://backbonejs.org/), with an emphasis on simple pragmatism over functional purity thanks to Henrik Joreteg's ["Feather" app demo](https://github.com/HenrikJoreteg/feather-app). Panel eschews opaque abstractions and data flow management layers to provide a straightforward, largely imperative, state-based rendering cycle. There are no built-in data flow abstractions like Mercury's channels, Flux/React's stores, Cycle's observables, Backbone's event soup and DOM dependencies. More complex state management systems such as Redux and RxJS can plug in to Panel seamlessly if desired (hint: in most apps, you just don't need it). A built-in router (based on the [Backbone Router](http://backbonejs.org/#Router)) can sync URL updates and HTML5 History with a Panel app's `state` for automatic updating and view-swapping.

## Installation

`npm install --save panel`

## Running tests

Tests run with Selenium through [web-component-tester](https://github.com/Polymer/web-component-tester).

#### Run with locally installed browsers
`npm test`

#### Tunnel to [Sauce Labs](https://saucelabs.com/)
`npm run test-sauce`

Set credentials with environment variables `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY`. The default browser/OS matrix is defined in `wct.conf.json`.

## License

MIT
