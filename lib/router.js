// just the necessary bits of Backbone router+history
export default class Router {
  constructor(app, options={}) {
    // allow injecting window dep
    const routerWindow = this.window = options.window || window;

    this.app = app;
    const routeDefs = this.app.ROUTES;

    // https://github.com/jashkenas/backbone/blob/d682061a/backbone.js#L1476-L1479
    // Cached regular expressions for matching named param parts and splatted
    // parts of route strings.
    const optionalParam = /\((.*?)\)/g;
    const namedParam    = /(\(\?)?:\w+/g;
    const splatParam    = /\*\w+/g;
    const escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    this.compiledRoutes = Object.keys(routeDefs).map(routeExpr => {
      // https://github.com/jashkenas/backbone/blob/d682061a/backbone.js#L1537-L1547
      let routeRegexp = routeExpr
        .replace(escapeRegExp, '\\$&')
        .replace(optionalParam, '(?:$1)?')
        .replace(namedParam, (match, optional) => optional ? match : '([^/?]+)')
        .replace(splatParam, '([^?]*?)');
      routeRegexp = new RegExp('^' + routeRegexp + '(?:\\?([\\s\\S]*))?$');
      return {expr: routeRegexp, handler: routeDefs[routeExpr]};
    });

    const navigateToHash = () => this.navigate(routerWindow.location.hash);
    routerWindow.addEventListener('popstate', () => navigateToHash());

    const historyMethod = options.historyMethod || 'pushState';
    const origChangeState = routerWindow.history[historyMethod];
    this.changeState = routerWindow.history[historyMethod] = function() {
      origChangeState.apply(routerWindow.history, arguments);
      navigateToHash();
    };
  }

  navigate(fragment, stateUpdate={}) {
    fragment = stripHash(fragment);
    if (fragment === this.app.state.$fragment && !Object.keys(stateUpdate).length) {
      return;
    }

    stateUpdate.$fragment = fragment;
    for (let route of this.compiledRoutes) {
      const matches = route.expr.exec(fragment);
      if (matches) {
        // extract params
        // https://github.com/jashkenas/backbone/blob/d682061a/backbone.js#L1553-L1558
        let params = matches.slice(1);
        params = params.map((param, i) => {
          // Don't decode the search params.
          if (i === params.length - 1) {
            return param || null;
          }
          return param ? decodeURIComponent(param) : null;
        });

        const routeStateUpdate = route.handler.call(this.app, stateUpdate, ...params);
        this.app.update(Object.assign({}, stateUpdate, routeStateUpdate));
        return;
      }
    }
  }

  replaceHash(fragment) {
    fragment = stripHash(fragment);
    if (fragment !== stripHash(this.window.location.hash)) {
      this.changeState(null, null, `#${fragment}`);
    }
  }
}

function stripHash(fragment) {
  return fragment.replace(/^#*/, '');
}
