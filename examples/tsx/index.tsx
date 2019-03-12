// import from the same repo. in a different repo you'd use:
// import { Component } from 'panel';
import _Snabbdom from 'snabbdom-pragma';
import { Component } from '../../lib';
import { PropertyFilter} from './property-filter';
import './property-filter.tsx';

const Snabbdom = _Snabbdom; // required so we don't lose Snabbdom reference, can probably use webpack to inject this.

const tojson = function<T>(obj: T) {
  return JSON.stringify(obj) as unknown as T;
};

interface State {
  filters: Array<PropertyFilter>,
}

class ExampleApp extends Component<State> {

  get config() {
    return {
      defaultState: {
        filters: [
          {
            filter: {
              operand: `true` as `true`, // why won't this happen automatically? how can I avoid type casting?
              operator: `is` as `is`,
            },
            property: `is_paying`,
            selected_property_type: `boolean` as `boolean`,
            type: `boolean` as `boolean`,
          },
        ],
        invalid_prop: 1, // why is this allowed?
      },

      template: (state: State) => { // I wish we didn't have to explicitly type this parameter, but it infers to "any". Ideas?
        return <div className='filters'>
          <property-filter attrs={{
            filters: tojson(state.filters),
          }}/>
          </div>;
      },
    };
  }
}

customElements.define('example-app', ExampleApp);
