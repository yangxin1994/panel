import { Component, registerComponent } from '../lib';
import h from 'virtual-dom/virtual-hyperscript';

registerComponent(class extends Component {
  static get tagName() {
    return 'counter-app';
  }

  attachedCallback() {
    super.attachedCallback();
    console.log('attached');
  }

  get initialState() {
    return {countVal: 1};
  }

  template(state) {
    return h('.counter', `Count: ${state.countVal}`);
  }
});

window.setInterval(() => {
  const el = document.getElementsByTagName('counter-app')[0];
  el.update({countVal: el.state.countVal + 1});
}, 1000);


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
