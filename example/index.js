import { App, View } from '../build';
import aboutTemplate from './about.jade';
import counterTemplate from './counter.jade';

class CounterApp extends App {
  get ROUTES() {
    return {
      'counter': this.counter,
      'about':   this.about,
      '':        this.about,
    };
  }

  get SCREENS() {
    return {
      counter: new CounterView(),
      about:   this.viewFromTemplate(aboutTemplate),
    };
  }

  about() {
    return {$screen: 'about'};
  }

  counter() {
    return {$screen: 'counter'};
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
