/* global chai */
import 'babel-polyfill';

import '../fixtures'; // import fixtures

// import tests
import './component';
import './router';
import './component-utils';

chai.config.truncateThreshold = 0; // nicer deep equal errors
