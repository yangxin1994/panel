import {Component} from '../../lib';

document.registerElement('test-app', class extends Component {
  get $defaultState() {
    return {
      foo: 'bar',
    };
  }

  // get $template() {
  //   return appTemplate;
  // }
});
