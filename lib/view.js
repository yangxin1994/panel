function deepMapViews(views, func) {
  if (Array.isArray(views)) {
    return views.map(view => deepMapViews(view, func));
  } else if (typeof views === 'object' && typeof views.render !== 'function') {
    return Object.keys(views).reduce((renderers, key) => {
      return Object.assign({}, renderers, {
        [key]: deepMapViews(views[key], func),
      });
    }, {});
  }
  return func(views);
}

export default class View {
  constructor(parent, initialState={}) {
    this.parent = parent;
    this.initialState = initialState;

    this.app = this.parent.app || this.parent;
    Object.assign(this.app.state, this.initialState);

    this._template = this.TEMPLATE;
    this._views = this.VIEWS;
    this._viewRenderers = deepMapViews(this._views, view => view.render.bind(view));
  }

  get TEMPLATE() {
    throw 'TEMPLATE must be provided by subclass';
  }

  get VIEWS() {
    return {};
  }

  get templateHandlers() {
    return {};
  }

  get templateHelpers() {
    return {};
  }

  render(state) {
    return this._template(
      Object.assign({}, state, {
        handlers: this.templateHandlers,
        helpers: this.templateHelpers,
        state,
        views: this._viewRenderers,
      })
    );
  }

  // shortcut to create views which don't need any handlers/helpers
  viewFromTemplate(templateFunc) {
    return this.app.viewFromTemplate(templateFunc, this);
  }
}
