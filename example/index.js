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
    this.update({countVal: this.state.countVal + offset});
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

new CounterApp('app', {$screen: 'about', countVal: 1}).start();
