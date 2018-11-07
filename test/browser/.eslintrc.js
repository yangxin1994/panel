module.exports = {
  extends: `mixpanel`,
  env: {
    mocha: true,
  },
  globals: {
    expect: true,
  },
  rules: {
    'no-unused-expressions': `off`,  // for Chai assertions such as expect(x).to.be.ok
  },
};
