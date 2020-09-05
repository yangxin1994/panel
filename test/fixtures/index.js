import {AttrsReflectionApp} from './attrs-reflection-app';
import {BadAttrsSchemaApp} from './bad-attrs-schema-app';
import {BreakableApp} from './breakable-app';
import {CssNoShadowApp} from './css-no-shadow-app';
import {DelayedAttrRemoveApp} from './delayed-attr-remove-app';
import {NestedApp, NestedChild} from './nested-app';
import {NestedKeyedChildrenApp, NestedKeyedChild1, NestedKeyedChild2} from './nested-keyed-children-app';
import {NestedPartialStateParent, NestedPartialStateChild} from './nested-partial-state-app';
import {BadBooleanRequiredAttrsSchemaApp, RequiredAttrsSchemaApp} from './required-attrs-schema-apps';
import {ShadowDomApp} from './shadow-dom-app';
import {SimpleApp} from './simple-app';
import {
  DefaultLightThemedWidget,
  ThemedWidget,
  MultiThemedWidget,
  DarkApp,
  ShadowDomDarkApp,
  SlottedDarkApp,
  SlottedLightApp,
  SlottedInvertedLightApp,
  SlottedLoadCounterWidget,
} from './context-app';

customElements.define(`attrs-reflection-app`, AttrsReflectionApp);
customElements.define(`bad-attrs-schema-app`, BadAttrsSchemaApp);
customElements.define(`bad-required-attrs-schema-app`, BadBooleanRequiredAttrsSchemaApp);
customElements.define(`breakable-app`, BreakableApp);
customElements.define(`css-no-shadow-app`, CssNoShadowApp);
customElements.define(`delayed-attr-remove-app`, DelayedAttrRemoveApp);
customElements.define(`nested-app`, NestedApp);
customElements.define(`nested-child`, NestedChild);
customElements.define(`nested-keyed-children-app`, NestedKeyedChildrenApp);
customElements.define(`nested-keyed-child1`, NestedKeyedChild1);
customElements.define(`nested-keyed-child2`, NestedKeyedChild2);
customElements.define(`nested-partial-state-parent`, NestedPartialStateParent);
customElements.define(`nested-partial-state-child`, NestedPartialStateChild);
customElements.define(`required-attrs-schema-app`, RequiredAttrsSchemaApp);
customElements.define(`shadow-dom-app`, ShadowDomApp);
customElements.define(`simple-app`, SimpleApp);

customElements.define(`default-light-themed-widget`, DefaultLightThemedWidget);
customElements.define(`themed-widget`, ThemedWidget);
customElements.define(`multi-themed-widget`, MultiThemedWidget);
customElements.define(`dark-app`, DarkApp);
customElements.define(`shadow-dom-dark-app`, ShadowDomDarkApp);
customElements.define(`slotted-dark-app`, SlottedDarkApp);
customElements.define(`slotted-light-app`, SlottedLightApp);
customElements.define(`slotted-inverted-light-app`, SlottedInvertedLightApp);
customElements.define(`slotted-load-counter-widget`, SlottedLoadCounterWidget);
