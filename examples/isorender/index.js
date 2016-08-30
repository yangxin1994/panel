// import from the same repo. in a different repo you'd use:
// import 'panel/isorender/dom-shims';
import '../../lib/isorender/dom-shims';

import './counter-app';

const counterApp = document.createElement('counter-app');
document.createElement('body').appendChild(counterApp);
requestAnimationFrame(() => console.log(counterApp.outerHTML));
