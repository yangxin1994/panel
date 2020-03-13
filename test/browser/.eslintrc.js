module.exports = {
  extends: [`mixpanel`, `prettier`],
  env: {
    mocha: true,
  },
  globals: {
    expect: true,
    sinon: true,
  },
  rules: {
    'no-unused-expressions': `off`, // for Chai assertions such as expect(x).to.be.ok
  },
};
