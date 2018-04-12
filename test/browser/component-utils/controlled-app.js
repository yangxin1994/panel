/* eslint-env mocha */
/* global expect */

describe(`Controlled App`, function() {
  let el;

  beforeEach(function(done) {
    document.body.innerHTML = ``;
    el = document.createElement(`controlled-app`);
    document.body.appendChild(el);
    window.requestAnimationFrame(() => done());
  });

  it(`does not allow update on component`, function() {
    expect(() => el.update({foo: `not bar`})).to.throw(/update\(\) not allowed from component. Use controller/);
  });

  it(`Behaves like normal component`, function(done) {
    let count = 0;
    expect(el.controller.state).to.be.eql({count});
    expect(el.textContent).to.contain(`Counter: ${count}`);

    el.querySelector(`button.incr`).click();
    count += 1;
    expect(el.controller.state).to.be.eql({count});

    window.requestAnimationFrame(() => {
      expect(el.textContent).to.contain(`Counter: ${count}`);
      done();
    });
  });
});
