# Let's build an app!

The example in this directory is a simple two-view "dynamic counter" app demonstrating the basics of Panel's view and routing conventions.

### 1. Static page

The HTML page is simple. The empty `#counter-app` div is where we'll tell our Panel app to render itself:
```html
<!DOCTYPE html>
<html>
  <head><title>Hello world</title></head>
  <body><div id="counter-app"></div></body>
</html>
```

Let's start the JavaScript code of the app, in `index.js` (in this development example, Webpack will transpile and inject it into the HTML page automatically). Every Panel app is a subclass of `App`:
```javascript
import { App } from 'panel';

class CounterApp extends App {
}
```

An app must define at least one 'screen' (top-level view), by overriding the `SCREENS` getter:
```javascript
import { App } from 'panel';

class CounterApp extends App {
  get SCREENS() {
    return {
      about: new AboutView(this),
    };
  }
}
```

The `AboutView` class is a subclass of `View`, which must provide a `TEMPLATE` function for rendering. In this example, we use Hyperscript for the template, but later we'll switch to Jade:
```javascript
class AboutView extends View {
  get TEMPLATE() {
    return () => h('.about', 'This is a sample app.');
  }
}
```

To kick off the rendering cycle, we instantiate the app, telling it to start on the `about` screen:
```javascript
new CounterApp('counter-app', {$screen: 'about'}).start();
```

At this point, the whole app looks like:
```javascript
import { App, View } from 'panel';
import h from 'virtual-dom/virtual-hyperscript';

class CounterApp extends App {
  get SCREENS() {
    return {
      about: new AboutView(this),
    };
  }
}

class AboutView extends View {
  get TEMPLATE() {
    return () => h('.about', 'This is a sample app.');
  }
}

new CounterApp('counter-app', {$screen: 'about'}).start();
```

Hurray! 18 lines of JavaScript to put a static chunk of text in the browser! But now we have the groundwork for an app with dynamic state and multiple routes.

### 2. Dynamic counter
Let's add a second view, which will display a value `countVal` passed to it by the app:
```javascript
class CounterView extends View {
  get TEMPLATE() {
    return state => h('.counter', `Counter: ${state.countVal}`);
  }
}
```
Now integrate it into the app:
```javascript
class CounterApp extends App {
  get SCREENS() {
    return {
      about:   new AboutView(this),
      counter: new CounterView(this),
    };
  }
}
// ...
const app = new CounterApp('counter-app', {
  $screen: 'counter',
  countVal: 1,
});
app.start();
```
Now our HTML page will display "Counter: 1". To change the value from 1 to some other `NEW_VALUE`, simply call `app.update({countVal: NEW_VALUE})`. Let's make the page display the number of seconds it's been open, by increasing `countVal` every 1000ms:
```javascript
window.setInterval(() => app.update({countVal: app.state.countVal + 1}), 1000);
```

### 3. Interaction
Instead of updating the counter automatically and relentlessly, we'll now add + and - buttons so the user can control the counter:
```javascript
class CounterView extends View {
  get TEMPLATE() {
    return state => h('.counter', [
      h('.val', `Counter: ${state.countVal}`),
      h('button.decr', {'ev-click': state.handlers.decr}, '-'),
      h('button.incr', {'ev-click': state.handlers.incr}, '+'),
    ]);
  }

  get templateHandlers() {
    return {
      decr: () => this.app.update({countVal: this.app.state.countVal - 1}),
      incr: () => this.app.update({countVal: this.app.state.countVal + 1}),
    };
  }
}
```
Now when the user clicks on the + button, the view's `incr` handler function is called, which updates the state by referencing `this.app`. We can extract the counter-updating logic into a separate helper:
```javascript
class CounterView extends View {
  // ...
  get templateHandlers() {
    return {
      decr: () => this.changeCounter(-1),
      incr: () => this.changeCounter(1),
    };
  }

  changeCounter(offset) {
    this.app.update({countVal: this.app.state.countVal + offset});
  }
}
```
Since views have access to the parent app (as well as parent views, for deeper view hierarchies), such helpers can be added to the main app or individual views as appropriate - they're just methods in plain JavaScript classes.

### 4. Routing
We have two screens, `about` and `counter`, but currently no way to switch between them. Calling `app.update({$screen: 'about'})` will switch to the `about` screen, but that update needs to be made explicitly. We can use Panel's built-in router to handle navigation between screens, also using the URL to switch between screens:
```javascript
class CounterApp extends App {
  get ROUTES() {
    return {
      'counter': () => ({$screen: 'counter'}),
      'about':   () => ({$screen: 'about'}),
      '':        'about',
    };
  }
  // ...
}
```
Now visiting a URL with location hash `#counter` will switch to the `counter` screen, and `#about` and empty hashes will go to `about` (the entry `'': 'about'` redirects to the route definition matching `about`).

Plain old HTML `anchor` tags with `href` values `#counter` and `#about` can now navigate between the views:
```javascript
class AboutView extends View {
  get TEMPLATE() {
    return () => h('.about', [
      h('p', 'This is a sample app.'),
      h('a', {href: '#counter'}, 'Counter'),
    ]);
  }
}

class CounterView extends View {
  get TEMPLATE() {
    return state => h('.counter', [
      h('.val', `Counter: ${state.countVal}`),
      h('.controls', [
        h('button.decr', {'ev-click': state.handlers.decr}, '-'),
        h('button.incr', {'ev-click': state.handlers.incr}, '+'),
      ]),
      h('a', {href: '#about'}, 'About'),
    ]);
  }
  // ...
}
```

We could also use click handlers which update `$screen` in the app state manually, for instance to use non-`<a>` elements for navigation, but in this case the extra code is unnecessary.

### 5. Advanced templating

View templates can be constructed separately from the View modules, as long as the `TEMPLATE` getter provides a function which takes app state as input and returns a `virtual-dom` tree. We can remove the raw hyperscript notation from our app by rewriting our templates as [Jade](http://jade-lang.com/) files and importing them with [virtual-jade-loader](https://github.com/tdumitrescu/virtual-jade-loader):
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
import aboutTemplate from './about.jade';
import counterTemplate from './counter.jade';

class AboutView extends View {
  get TEMPLATE() {
    return aboutTemplate;
  }
}

class CounterView extends View {
  get TEMPLATE() {
    return counterTemplate;
  }
  // ...
}
```

Furthermore, since `AboutView` contains no helpers or handlers, nothing except a view template, we can eliminate its explicit class definition altogether with the convenience method `viewFromTemplate()`:
```javascript
class CounterApp extends App {
  // ...
  get SCREENS() {
    return {
      about:   this.viewFromTemplate(aboutTemplate),
      counter: new CounterView(this),
    };
  }
}
```

The final `index.js` gives us a lightweight, minimal app with dynamic updates, routing, and isolated markup:
```javascript
import { App, View } from 'panel';
import aboutTemplate from './about.jade';
import counterTemplate from './counter.jade';

class CounterApp extends App {
  get ROUTES() {
    return {
      'counter': () => ({$screen: 'counter'}),
      'about':   () => ({$screen: 'about'}),
      '':        'about',
    };
  }

  get SCREENS() {
    return {
      about:   this.viewFromTemplate(aboutTemplate),
      counter: new CounterView(this),
    };
  }
}

class CounterView extends View {
  get TEMPLATE() {
    return counterTemplate;
  }

  get templateHandlers() {
    return {
      decr: () => this.changeCounter(-1),
      incr: () => this.changeCounter(1),
    };
  }

  changeCounter(offset) {
    this.app.update({countVal: this.app.state.countVal + offset});
  }
}

const app = new CounterApp('counter-app', {
  $screen: 'counter',
  countVal: 1,
});
app.start();
```
