import 'webcomponents.js';

import { Component, registerComponent } from '../lib';
import h from 'virtual-dom/virtual-hyperscript';

registerComponent('counter-app', class extends Component {
  get $defaultState() {
    return {
      $view: 'about',
    };
  }

  $template(state) {
    return h('.app', [
      this.child('counter-header'),
      this.child('view-about'),
      this.child('view-counter'),
    ]);
  }
});

registerComponent('view-about', class extends Component {
  $shouldDisplay() {
    return this.state.$view === 'about';
  }

  $template() {
    return h('.about', 'This is a sample app.');
  }
});

registerComponent('view-counter', class extends Component {
  get $defaultState() {
    return {
      count: 5,
    };
  }

  $shouldDisplay() {
    return this.state.$view === 'counter';
  }

  $template(state) {
    return h('.counter', [
      h('.val', `Counter: ${state.count}`),
      h('button.decr', {onclick: () => this.updateCount(-1)}, '-'),
      h('button.incr', {onclick: () => this.updateCount(1) }, '+'),
    ]);
  }

  updateCount(offset) {
    this.update({count: this.state.count + offset});
  }
});

registerComponent('counter-header', class extends Component {
  navigate($view) {
    this.update({$view});
  }

  $template() {
    return h('.header', [
      h('span', {onclick: () => this.navigate('about')  }, 'About ' ),
      h('span', {onclick: () => this.navigate('counter')}, 'Counter'),
    ]);
  }
});

// window.setInterval(() => {
//   const el = document.getElementsByTagName('counter-app')[0];
//   el.update({count: el.state.count + 1});
// }, 1000);


// import { App, View } from '../lib';
// import aboutTemplate from './about.jade';
// import counterTemplate from './counter.jade';

// class CounterApp extends App {
//   get ROUTES() {
//     return {
//       'counter': () => ({$screen: 'counter'}),
//       'about':   () => ({$screen: 'about'}),
//       '':        'about',
//     };
//   }

//   get SCREENS() {
//     return {
//       counter: new CounterView(this),
//       about:   this.viewFromTemplate(aboutTemplate),
//     };
//   }
// }

// class CounterView extends View {
//   get TEMPLATE() {
//     return counterTemplate;
//   }

//   get templateHandlers() {
//     return {
//       incr: () => this.changeCounter(1),
//       decr: () => this.changeCounter(-1),
//     };
//   }

//   changeCounter(offset) {
//     this.app.update({countVal: this.app.state.countVal + offset});
//   }
// }

// window.addEventListener('load', () => {
//   new CounterApp('counter-app', {$screen: 'about', countVal: 1}).start();
// });
