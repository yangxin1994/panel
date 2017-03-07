# panel

[![Build Status](https://travis-ci.org/mixpanel/panel.svg?branch=master)](https://travis-ci.org/mixpanel/panel)

[![Build Status](https://saucelabs.com/browser-matrix/panel.svg)](https://saucelabs.com/open_sauce/user/panel)

Apps made of composable, manageable Web Components. Because coding UIs shouldn't be rocket science.

```javascript
import { Component } from 'panel';
import counterTemplate from './counter.jade';

document.registerElement('counter-app', class extends Component {
  get config() {
    return {
      defaultState: {count: 1},

      helpers: {
        decr: () => this.changeCounter(-1),
        incr: () => this.changeCounter(1),
      },

      template: counterTemplate,
    };
  }

  changeCounter(offset) {
    this.update({count: this.state.count + offset});
  }
});

document.body.appendChild(document.createElement('counter-app'));
```
```jade
.counter
  .val Counter: #{count}
  .controls
    button.decr(on={click: $helpers.decr}) -
    button.incr(on={click: $helpers.incr}) +
```

## Motivation and technologies

Panel makes [Web Components](http://webcomponents.org/) suitable for constructing full web UIs, not just low-level building blocks. It does so by providing an easy-to-use state management and rendering layer built on Virtual DOM, modeled on the core rendering technology of [React](https://facebook.github.io/react/). Through use of the [Snabbdom](https://github.com/snabbdom/snabbdom) Virtual DOM library and first-class support for multiple templating formats, Panel offers simple yet powerful APIs for rendering, animation, styling, and DOM lifecycle.

Each Panel application is a Web Component, composed of DOM elements and potentially arbitrarily nested child components, each of which is technically an app in its own right. Parent and child components can share `state`, in the form of Plain Old JavaScript Objects which are passed to templates for rendering. When `update()` is called on a component with state changes, the DOM gets updated according to the diff. Templates can be in any format that produces Snabbdom-compatible [hyperscript](https://github.com/snabbdom/snabbdom#snabbdomh), including raw Hyperscript code or Jade or JSX.

The architecture of Panel draws upon aspects of and technologies from [Mercury](https://github.com/Raynos/mercury), [Polymer](https://www.polymer-project.org), [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/), [Cycle](http://cycle.js.org/), and [Backbone](http://backbonejs.org/), with an emphasis on simple pragmatism over functional purity thanks to Henrik Joreteg's ["Feather" app demo](https://github.com/HenrikJoreteg/feather-app). Panel eschews opaque abstractions and data flow management layers to provide a straightforward state-based rendering cycle. There are no built-in data flow abstractions like Mercury's channels, Flux/React's stores, Cycle's observables, Backbone's event soup and DOM dependencies. More complex state management systems such as Redux and RxJS can plug in to Panel seamlessly if desired (hint: in most apps, you just don't need it). A built-in router (based on the [Backbone Router](http://backbonejs.org/#Router)) can sync URL updates and HTML5 History with a Panel app's `state` for automatic updating and view-swapping.

Since early 2016, Panel and Web Components have powered Mixpanel's most advanced new UIs in production, including [Insights](https://mixpanel.com/report/insights), [Dashboards](https://mixpanel.com/report/dashboard), [Autotrack](https://mixpanel.com/report/autotrack/web), and [JQL Console](https://mixpanel.com/report/jql-console).

## Installation

`npm install --save panel`

If your target environment does not implement HTML custom elements natively, you must supply a polyfill, such as [webcomponents.js](https://github.com/webcomponents/webcomponentsjs).

## Documentation and examples

API docs can be found at [http://mixpanel.github.io/panel/](http://mixpanel.github.io/panel/).

For some sample apps with explanations see [examples/](https://github.com/mixpanel/panel/tree/master/examples). These include demonstrations of using Panel with JSX and Redux.

A brief tutorial is available in the [examples/tutorial](https://github.com/mixpanel/panel/tree/master/examples/tutorial) directory. The sample app accompanying the tutorial features routing, Jade templating, and infrastructure for practical usage such as Webpack/Babel configuration and inclusion of a Web Components polyfill.

A Panel implementation of the [TodoMVC](http://todomvc.com/) app spec is available at [https://github.com/tdumitrescu/todomvc-panel](https://github.com/tdumitrescu/todomvc-panel).

## Running tests

Browser tests run with Selenium through [web-component-tester](https://github.com/Polymer/web-component-tester). Server-side rendering tests use `mocha` and `chai` directly.

#### Run with locally installed browsers
`npm test`

#### Tunnel to [Sauce Labs](https://saucelabs.com/)
`npm run build-test && npm run test-browser-sauce`

Set credentials with environment variables `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY`. The default browser/OS matrix is defined in `wct.conf.json`.

## License

MIT
