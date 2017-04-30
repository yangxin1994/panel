import { AttrReflectionApp } from './attr-reflection-app';
import { BreakableApp } from './breakable-app';
import { CssNoShadowApp } from './css-no-shadow-app';
import { NestedApp, NestedChild } from './nested-app';
import { ShadowDomApp } from './shadow-dom-app';
import { SimpleApp } from './simple-app';

customElements.define('attr-reflection-app', AttrReflectionApp);
customElements.define('breakable-app', BreakableApp);
customElements.define('css-no-shadow-app', CssNoShadowApp);
customElements.define('nested-app', NestedApp);
customElements.define('nested-child', NestedChild);
customElements.define('shadow-dom-app', ShadowDomApp);
customElements.define('simple-app', SimpleApp);
