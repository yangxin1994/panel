# Let's build an app!

The example in this directory is a simple two-view "dynamic counter" app demonstrating the basics of Panel's view and routing conventions.

### 1. Static page

The HTML page is simple. The `counter-app` custom element is where the Panel app will render itself:
```html
<!DOCTYPE html>
<html>
  <head><title>Hello world</title></head>
  <body>
    <counter-app></counter-app>
  </body>
</html>
```

Let's start the JavaScript code of the app, in `index.js` (in this development example, Webpack will transpile and inject it into the HTML page automatically). Every Panel app is defined as a custom element (Web Component) using [`document.registerElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/registerElement):

```javascript
import { Component } from 'panel';

document.registerElement('counter-app', class extends Component {
  // counter-app code goes here
});
```

The only property which an app must define is its view template. In this example, we use Hyperscript for the template, but later we'll switch to Jade:
```javascript
import { Component } from 'panel';
import h from 'virtual-dom/virtual-hyperscript';

document.registerElement('counter-app', class extends Component {
  get $template() {
    return () => h('.about', 'This is a sample app.');
  }
});
```

Hurray! The `<counter-app>` element in our HTML will now be populated with a static chunk of text, and all it took was a bunch of JavaScript... But now we have the groundwork for an app with dynamic state and routing.

### 2. Dynamic counter
Let's split the app into two views: the 'about' screen defined above, and a 'counter' screen which will display a dynamic value `count`. Defining the 'counter' view looks quite like what we did in the previous section to define the app element:
```javascript
document.registerElement('counter-view', class extends Component {
  get $template() {
    return state => h('.counter', `Counter: ${state.count}`);
  }
});
```
The 'about' view is similar:
```javascript
document.registerElement('about-view', class extends Component {
  get $template() {
    return () => h('.about', 'This is a sample app.');
  }
});
```
Now let's show them both simultaneously in the app. The `$defaultState` property defines a starting state object for the app. The `this.child()` call inserts the subcomponents, taking care of hooking them up to the parent app/component so that they all share a single state:
```javascript
document.registerElement('counter-app', class extends Component {
  get $defaultState() {
    return {count: 1};
  }

  get $template() {
    return () => h('.app', [
      this.child('about-view'),
      this.child('counter-view'),
    ]);
  }
});
```
Now the bottom our HTML page will display "Counter: 1". To change the value from 1 to some other `NEW_VALUE`, simply call `el.update({count: NEW_VALUE})`, where `el` is any of the app's components. Let's make the page display the number of seconds it's been open, by increasing `count` every 1000ms:
```javascript
let app;
window.setInterval(() => {
  app = app || document.getElementsByTagName('counter-app')[0];
  app.update({count: app.state.count + 1});
}, 1000);
```

### 3. Interaction
Instead of updating the counter automatically and relentlessly, we'll now add + and - buttons so the user can control the counter:
```javascript
document.registerElement('counter-view', class extends Component {
  get $template() {
    return state => h('.counter', [
      h('.val', `Counter: ${state.count}`),
      h('button.decr', {onclick: state.$helpers.decr}, '-'),
      h('button.incr', {onclick: state.$helpers.incr}, '+'),
    ]);
  }

  get $helpers() {
    return {
      decr: () => this.update({count: this.state.count - 1}),
      incr: () => this.update({count: this.state.count + 1}),
    };
  }
});
```
Now when the user clicks on the + button, the view's `incr` handler function is called, which updates the state. We can extract the counter-updating logic into a separate helper:
```javascript
document.registerElement('counter-view', class extends Component {
  // ...
  get $helpers() {
    return {
      decr: () => this.changeCounter(-1),
      incr: () => this.changeCounter(1),
    };
  }

  changeCounter(offset) {
    this.update({count: this.state.count + offset});
  }
});
```
Since components have access to the parent app (as well as parent views, for deeper view hierarchies), such helpers can be added to the main app or individual views as appropriate - they're just methods in plain JavaScript classes.

### 4. Routing
We have two 'views', `about` and `counter`, but currently no way to switch between them. Panel's built-in router can help handle navigation between views, by allowing URL/history changes to effect state changes:
```javascript
document.registerElement('counter-app', class extends Component {
  get $defaultState() {
    return {
      $view: 'about',
      count: 1,
    };
  }

  get $routes() {
    return {
      'counter': () => ({$view: 'counter'}),
      'about':   () => ({$view: 'about'}),
      '':        'about',
    };
  }

  get $template() {
    return state => this.child(`${state.$view}-view`);
  }
});
```
Now visiting a URL with location hash `#counter` will switch to the `counter` view, and `#about` and empty hashes will go to `about` (the entry `'': 'about'` redirects to the route definition matching `about`).

Plain old HTML `anchor` tags with `href` values `#counter` and `#about` can now navigate between the views:
```javascript
document.registerElement('about-view', class extends Component {
  get $template() {
    return () => h('.about', [
      h('p', 'This is a sample app.'),
      h('a', {href: '#counter'}, 'Counter'),
    ]);
  }
});

document.registerElement('counter-view', class extends Component {
  get $template() {
    return state => h('.counter', [
      h('.val', `Counter: ${state.count}`),
      h('.controls', [
        h('button.decr', {onclick: state.$helpers.decr}, '-'),
        h('button.incr', {onclick: state.$helpers.incr}, '+'),
      ]),
      h('a', {href: '#about'}, 'About'),
    ]);
  }
  // ...
});
```

We could also use click handlers which update `$view` in the app state manually, for instance to use non-`<a>` elements for navigation, but in this case the extra code is unnecessary.

### 5. Advanced templating

View templates can be constructed separately from the Component modules, as long as the `$template` getter provides a function which takes app state as input and returns a `virtual-dom` tree. We can remove the raw hyperscript notation from our app by rewriting our templates as [Jade](http://jade-lang.com/) files and importing them with [virtual-jade-loader](https://github.com/tdumitrescu/virtual-jade-loader):
```jade
.app= $component.child($view + '-view')
```
```jade
.about
  p This is a sample app.
  a(href='#counter') Counter
```
```jade
.counter
  .val Counter: #{countVal}
  .controls
    button.decr(ev-click=handlers.decr) -
    button.incr(ev-click=handlers.incr) +
  a(href='#about') About
```
```javascript
import template from './app.jade';
import aboutTemplate from './about.jade';
import counterTemplate from './counter.jade';

document.registerElement('counter-app', class extends Component {
  // ...
  get $template() {
    return template;
  }
});

document.registerElement('about-view', class extends Component {
  get $template() {
    return aboutTemplate;
  }
});

document.registerElement('counter-view', class extends Component {
  get $template() {
    return counterTemplate;
  }
  // ...
});
```

The final `index.js` gives us a lightweight, minimal app with dynamic updates, routing, and isolated markup. Moreover, the app is composed of Web Components which connect to each other intelligently and render with one-way data flow (state updates result in DOM updates), coupling web APIs with the power and simplicity of virtual DOM rendering.
```javascript
import { Component } from 'panel';

import template from './app.jade';
import aboutTemplate from './about.jade';
import counterTemplate from './counter.jade';

document.registerElement('counter-app', class extends Component {
  get $defaultState() {
    return {
      $view: 'about',
      count: 1,
    };
  }

  get $routes() {
    return {
      'counter': () => ({$view: 'counter'}),
      'about':   () => ({$view: 'about'}),
      '':        'about',
    };
  }

  get $template() {
    return template;
  }
});

document.registerElement('about-view', class extends Component {
  get $template() {
    return aboutTemplate;
  }
});

document.registerElement('counter-view', class extends Component {
  get $template() {
    return counterTemplate;
  }

  get $helpers() {
    return {
      decr: () => this.changeCounter(-1),
      incr: () => this.changeCounter(1),
    };
  }

  changeCounter(offset) {
    this.update({count: this.state.count + offset});
  }
});
```
