import { AttrReflectionApp } from './attr-reflection-app';
import { BreakableApp } from './breakable-app';
import { CssNoShadowApp } from './css-no-shadow-app';
import { NestedApp, NestedChild } from './nested-app';
import { ShadowDomApp } from './shadow-dom-app';
import { SimpleApp } from './simple-app';

document.registerElement('attr-reflection-app', AttrReflectionApp);
document.registerElement('breakable-app', BreakableApp);
document.registerElement('css-no-shadow-app', CssNoShadowApp);
document.registerElement('nested-app', NestedApp);
document.registerElement('nested-child', NestedChild);
document.registerElement('shadow-dom-app', ShadowDomApp);
document.registerElement('simple-app', SimpleApp);
