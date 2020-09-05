export class LightTheme {
  getName() {
    return `light`;
  }
}

export class DarkTheme {
  getName() {
    return `dark`;
  }
}

export class LoadCounter {
  constructor() {
    this.count = 0;
  }
  bindToComponent(component) {
    this.count += 1;
  }
  unbindFromComponent(component) {
    this.count += 1;
  }
  getCount() {
    return this.count;
  }
}
