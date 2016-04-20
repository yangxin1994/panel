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

  changeCounter(offset) {
    this.update({counter: this.state.counter + offset});
  }
}

class CounterView extends View {
  get TEMPLATE() {
    return counterTemplate;
  }

  get templateHandlers() {
    return {
      incr: () => this.app.changeCounter(1),
      decr: () => this.app.changeCounter(-1),
    }
  }
}

new CounterApp('app', {$screen: 'about', counter: 1}).start();
