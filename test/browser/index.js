import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

import 'babel-polyfill';

import '../fixtures'; // import fixtures

// import tests
import './component';
import './router';

chai.config.truncateThreshold = 0; // nicer deep equal errors
