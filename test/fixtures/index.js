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
  ContextAlphaWidget,
  ImmediateContextParent,
  ImmediateContextParentWithWrapper,
  ShadowDomContextParent,
  ContextAlphaSlottedWidget,
  ContextAlphaAltSlottedWidget,
  NestedSlottedContextWidgets,
  ContextGrandparent,
  ContextBravoWidget,
  ContextBravoParentWithNestedAlphaWidgets,
  ContextlessSlottedWrapper,
  ContextParentWithContextlessSlottedWrapper,
  ContextlessComponentWrapper,
  ContextParentWithContextlessComponentWrapper,
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

customElements.define(`context-alpha-widget`, ContextAlphaWidget);
customElements.define(`immediate-context-parent`, ImmediateContextParent);
customElements.define(`immediate-context-parent-with-wrapper`, ImmediateContextParentWithWrapper);
customElements.define(`shadow-dom-context-parent`, ShadowDomContextParent);
customElements.define(`context-alpha-slotted-widget`, ContextAlphaSlottedWidget);
customElements.define(`context-alpha-alt-slotted-widget`, ContextAlphaAltSlottedWidget);
customElements.define(`nested-slotted-context-widgets`, NestedSlottedContextWidgets);
customElements.define(`context-grandparent`, ContextGrandparent);
customElements.define(`context-bravo-widget`, ContextBravoWidget);
customElements.define(`context-bravo-parent-with-nested-alpha-widgets`, ContextBravoParentWithNestedAlphaWidgets);
customElements.define(`contextless-slotted-wrapper`, ContextlessSlottedWrapper);
customElements.define(`context-parent-with-contextless-slotted-wrapper`, ContextParentWithContextlessSlottedWrapper);
customElements.define(`contextless-component-wrapper`, ContextlessComponentWrapper);
customElements.define(
  `context-parent-with-contextless-component-wrapper`,
  ContextParentWithContextlessComponentWrapper,
);
