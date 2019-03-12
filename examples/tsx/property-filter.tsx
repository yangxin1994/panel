
import _Snabbdom from 'snabbdom-pragma';
import { Component } from '../../lib';

const Snabbdom = _Snabbdom; // required so we don't lose Snabbdom reference, can probably use webpack to inject this.

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'property-filter': {attrs: PropertyFilterComponent['attrs']};
    }
  }
}

type PropertyType = 'behavioral' | 'boolean' | 'datetime' | 'list' | 'object' | 'number' | 'string' | 'unknown';
type Property = string | {name: string, source: `user` | `properties`, type: PropertyType};

interface BasePropertyFilter {
  allow_delete?: boolean,
  default_filters?: boolean,
  property: Property,
  selected_property_type: PropertyType,
}

interface StringPropertyFilter extends BasePropertyFilter {
  type: 'string' | 'unknown',
  filter?: {
    operator: 'in' | 'not in' | 'set' | 'not set' | '==' | '!=',
    operand?: string | Array<string>,
  }
}

interface NumberPropertyFilter extends BasePropertyFilter {
  type: 'number',
  filter?: {
    operator: '==' | '!=' | '>' | '<' | '><',
    operand: number,
  }
}

interface ObjectPropertyFilter extends BasePropertyFilter {
  type: 'object',
  filter?: {
    operator?: '==' | '!=' | '>' | '<' | '><',
    operand?: string,
    segments: Array<any>,
  }
}

interface ListPropertyFilter extends BasePropertyFilter {
  type: 'list',
  filter: {
    operator: 'in' | 'not in',
    operand: Array<string> | Array<number>,
  }
}

interface BooleanPropertyFilter extends BasePropertyFilter {
  type: 'boolean',
  filter: {
    operator: 'is',
    operand: 'true' | 'false',
  }
}

export interface DateTimePropertyFilter extends BasePropertyFilter {
  type: 'datetime',
  filter: {
    operator: '==' | '><' | '>' | '<',
    operand: number,
    unit: 'days' | 'weeks' | 'months',
  }
}

export type PropertyFilter = StringPropertyFilter
  | NumberPropertyFilter
  | ObjectPropertyFilter
  | ListPropertyFilter
  | BooleanPropertyFilter
  | DateTimePropertyFilter;

interface State {
  filters: Array<PropertyFilter>;
}

class PropertyFilterComponent extends Component<State> {
  attrs: {
    filters: Array<PropertyFilter>;
  };

  get config() {
    return {
      defaultState: {
        filters: [],
      },
      template: (state: State) => { // I wish we didn't have to explicitly type this parameter, but it infers to "any". Ideas?
        return <div>{JSON.stringify(state.filters)}</div>;
      },
    };
  }

  static get observedAttributes() {
    return [`filters`];
  }

  attributeChangedCallback(attr, _, newVal) {
    if (attr === `filters`) {
      this.update({filters: newVal});
    }
  }
}
customElements.define('property-filter', PropertyFilterComponent);
