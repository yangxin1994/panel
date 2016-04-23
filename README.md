[![Build Status](https://travis-ci.org/mixpanel/panel.svg?branch=master)](https://travis-ci.org/mixpanel/panel)
# panel

A no-frills ES2015 microframework for virtual-dom view management and routing. Because coding UIs shouldn't be rocket science.

```javascript
import { App, View } from 'panel';
import counterTemplate from './counter.jade';

class CounterApp extends App {
  get SCREENS() {
    return {counter: new CounterView(this)};
  }
}

class CounterView extends View {
  get TEMPLATE() {
    return counterTemplate;
  }

  get templateHandlers() {
    return {
      incr: () => this.app.update({counter: this.app.state.countVal + 1}),
      decr: () => this.app.update({counter: this.app.state.countVal - 1}),
    }
  }
}

new CounterApp('counter-app', {$screen: 'counter', countVal: 1}).start();
```
```jade
.counter
  .val Counter: #{counter}
  .controls
    button.decr(ev-click=handlers.decr) -
    button.incr(ev-click=handlers.incr) +
```

## Motivation and technologies

Inspired by aspects of [Mercury](https://github.com/Raynos/mercury), [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/), and [Cycle](http://cycle.js.org/), with an emphasis on simple pragmatism over functional purity thanks to Henrik Joreteg's ["Feather" app demo](https://github.com/HenrikJoreteg/feather-app). Strips out the opaque abstractions and data flow management layers to provide a straightforward, largely imperative, state-based rendering cycle. Gone are Mercury's channels, React's stores, Cycle's observables, Backbone's event soup and DOM dependencies - a Plain Old Javascript Object represents state, you update it with `App.update()`, and the DOM gets updated according to the diff. If you really need more fine-grained state management, you can plug in Redux seamlessly (hint: in most apps, you just don't need it).

Magic is kept to a minimum. Core components are [virtual-dom](https://github.com/Matt-Esch/virtual-dom) for mapping state to DOM, [main-loop](https://github.com/Raynos/main-loop) for batching updates efficiently, and [dom-delegator](https://github.com/Raynos/dom-delegator) for attaching event handlers to virtual-dom nodes. `panel` glues these together while adding some facilities for effectively nesting views, standardizing event handlers/template helpers, and providing out-of-the-box routing (based on the [Backbone Router](http://backbonejs.org/#Router)). View templates can be made with anything that produces [Hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript), including raw hyperscript code or Jade or JSX. Close control of component lifecycle events and DOM rendering can be achieved through use of [Web Components](http://webcomponents.org/) or [virtual-dom widgets](https://github.com/Matt-Esch/virtual-dom/blob/master/docs/widget.md).

## Installation

`npm install --save panel`

## Running tests

`npm test`

With debugger: `npm run test-debug`
