# Animating elements in and out with CSS

Panel facilitates element lifecycle animations by allowing you to declare CSS styles and classes to be added or removed when an element is being added to or removed from the DOM (thanks to the Snabbdom [style module](https://github.com/snabbdom/snabbdom#delayed-properties) and [`snabbdom-delayed-class`](https://github.com/tdumitrescu/snabbdom-delayed-class)). In this example, every time the user clicks a button to add or remove boxes, the `box-visible` class gets toggled on boxes entering or exiting the DOM:

```jade
each box in Array(count).fill()
  .box(class={
    'box-visible': false,
    delayed: {'box-visible': true},
    remove:  {'box-visible': false, delayRemove: 500},
  })
```

The `delayed` class configuration adds the `box-visible` class only on the next animation frame after the element enters the DOM, triggering a CSS transition to fade the element in over 500ms:

```stylus
.box
  opacity 0
  transition opacity .5s ease-in-out
  &.box-visible
    opacity 1
```

Likewise the `delayRemove` entry in the `remove` configuration keeps the element in the DOM an extra 500ms when it exits, giving it time to run the reverse transition (fade out).

The `app.jade` template uses the [`key` property](https://github.com/snabbdom/snabbdom#key--string--number) to identify elements uniquely, i.e., to prevent the virtual DOM library from reusing the same `div` when swapping out one element for another. This technique is useful for controlling exactly when elements should really leave or enter the DOM, instead of letting the DOM differ take the shortest route to patch the DOM.

This example also demonstrates a Webpack configuration to extract a global CSS file from [Stylus](http://stylus-lang.com/) source (rather than component-scoped styles with Shadow DOM).

To install and run the example from this directory: `npm install && npm start`. The page will be served on `localhost:8080` by Webpack dev server.
