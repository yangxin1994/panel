import {Component, PanelLifecycleContext} from '../../lib';

export interface Theme {
  getName(): string;
}

export class LightTheme implements Theme {
  getName(): 'white';
}

export class DarkTheme implements Theme {
  getName(): 'black';
}

export class LoadCounter implements PanelLifecycleContext {
  bindToComponent(component: Component<any>): void;
  unbindFromComponent(component: Component<any>): void;
  getCount(): number;
}
