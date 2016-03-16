export default class View {
  constructor(parent, initialState={}) {
    this.parent = parent;
    this.initialState = initialState;
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
        helpers: this.templateHelpers
      })
    );
  }

  setApp(app) {
    this.app = app;
    Object.assign(app.state, this.initialState);
    this.views && this.views.forEach(v => v.setApp(app));
  }
}
