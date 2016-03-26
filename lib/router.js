// just the necessary bits of Backbone router+history
export default class Router {
  constructor(app, options={}) {
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

    const navigateToHash = () => this.navigate(window.location.hash.replace(/^#*/, ''));
    window.addEventListener('popstate', () => navigateToHash());

    const historyMethod = options.historyMethod || 'pushState';
    const origChangeState = window.history[historyMethod];
    this.changeState = window.history[historyMethod] = function() {
      origChangeState.apply(window.history, arguments);
      navigateToHash();
    };
  }

  navigate(fragment, state={}) {
    if (fragment === this.app.state.$fragment && !Object.keys(state).length) {
      return;
    }

    state.$fragment = fragment;
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

        return route.handler.call(this.app, state, ...params);
      }
    }
  }

  replaceHash(fragment) {
    if (fragment !== window.location.hash.replace(/^#*/, '')) {
      this.changeState(null, null, `#${fragment}`);
    }
  }
}
