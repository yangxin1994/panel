export class ContextAlpha {
  getTestName() {}
}
export class ContextAlphaImpl extends ContextAlpha {
  constructor(testName) {
    super();
    this.testName = testName;
  }
  getTestName() {
    return this.testName;
  }
}
export class ContextAlphaAltImpl extends ContextAlpha {
  getTestName() {
    return `alt-alpha`;
  }
}

export class ContextBravo {
  getBravo() {}
}
export class ContextBravoImpl extends ContextBravo {
  constructor(testName) {
    super();
    this.testName = testName;
  }
  getTestName() {
    return this.testName;
  }
}
