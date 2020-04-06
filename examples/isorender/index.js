/* eslint-disable no-console */
// import from the same repo. in a different repo you'd use:
// import 'panel/isorender/dom-shims';
import '../../lib/isorender/dom-shims';

import './counter-app';

// promisify requestAnimationFrame for async/await
const RAF = () => new Promise(requestAnimationFrame);

async function renderAppHTML() {
  const counterApp = document.createElement(`counter-app`);
  document.createElement(`body`).appendChild(counterApp);

  await RAF();

  console.log(`Initial HTML:`);
  console.log(counterApp.outerHTML);

  console.log(`Update counter to 5:`);
  counterApp.update({count: 5});

  await RAF();

  console.log(counterApp.outerHTML);
}

renderAppHTML();
