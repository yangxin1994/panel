import { App, View } from '../build';
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
      counter: new CounterView(this),
      about:   this.viewFromTemplate(aboutTemplate),
    };
  }
}

class CounterView extends View {
  get TEMPLATE() {
    return counterTemplate;
  }

  get templateHandlers() {
    return {
      incr: () => this.changeCounter(1),
      decr: () => this.changeCounter(-1),
    };
  }

  changeCounter(offset) {
    this.app.update({countVal: this.app.state.countVal + offset});
  }
}

new CounterApp('counter-app', {$screen: 'about', countVal: 1}).start();
