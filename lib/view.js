export default class View {
  constructor(parent, initialState={}) {
    this.parent = parent;
    this.initialState = initialState;
    this._views = this.VIEWS;
    this._viewRenderers = Object.keys(this._views).reduce((renderers, vname) => {
      const view = this._views[vname];
      return Object.assign({}, renderers, {[vname]: view.render.bind(view)});
    }, {});
  }

  get VIEWS() {
    return {};
  }

  get template() {
    console.error('No template function provided');
  }

  get templateHandlers() {
    return {};
  }

  get templateHelpers() {
    return {};
  }

  render(state) {
    return this.template(
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
    Object.keys(this._views).forEach(v => this._views[v].setApp(app));
  }
}
