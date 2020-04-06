module.exports = {
  extends: `mixpanel`,
  env: {
    mocha: true,
  },
  globals: {
    expect: true,
    sinon: true,
  },
  rules: {
    'space-before-function-paren': 'off',
    'no-unused-expressions': `off`, // for Chai assertions such as expect(x).to.be.ok
  },
};
