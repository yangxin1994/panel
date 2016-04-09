function deepMapViews(views, func) {
  if (typeof views.render === 'function') {
    return func(views);
  } else if (Array.isArray(views)) {
    return views.map(view => deepMapViews(view, func));
  } else if (typeof views === 'object') {
    return Object.keys(views).reduce((renderers, key) => {
      return Object.assign({}, renderers, {
        [key]: deepMapViews(views[key], func),
      });
    }, {});
  }
}

export default class View {
  constructor(parent, initialState={}) {
    this.parent = parent;
    this.initialState = initialState;
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

  setApp(app) {
    this.app = app;
    Object.assign(app.state, this.initialState);
    deepMapViews(this._views, view => view.setApp(app));
  }
}
