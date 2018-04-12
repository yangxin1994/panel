import {Component, ProxyComponent, h} from '../../lib';

class AddressCardV1 extends Component {
  get config() {
    return {
      template: ({$component}) => {
        return h(`div`, [
          h(`ul`, [
            h(`li`, $component.getAttribute(`name`)),
            h(`li`, {on: {click: () => this.registerClick()}}, $component.getAttribute(`city`)),
          ])
        ]);
      }
    }
  }

  registerClick(ev) {
    this.dispatchEvent(new CustomEvent(`clickedCity`));
  }

  static get observedAttributes() {
    return Component.observedAttributes.concat([
      `name`, `city`,
    ]);
  }
}

class AddressCardV2 extends Component {
  get config() {
    return {
      template: ({$component}) => {
        return h(`div`, [
          h(`ul`, [
            h(`li`, $component.getAttribute(`name`)),
            h(`li`, `(experimental feature for beta)`),
            h(`li`, {on: {click: () => this.registerClick()}}, $component.getAttribute(`city`)),
          ])
        ]);
      }
    }
  }

  registerClick(ev) {
    this.dispatchEvent(new CustomEvent(`clickedCity`));
  }

  static get observedAttributes() {
    return Component.observedAttributes.concat([
      `name`, `city`,
    ]);
  }
}

class AddressCard extends ProxyComponent {
  getTargetElementTag() {
    // Arbitrary switching logic goes here.
    if (window.location.search.match(/use_experimental_card/) || this.isAttributeEnabled(`force-v2`)) {
      return `address-card-v2`;
    }

    return `address-card-v1`;
  }

  static get observedAttributes() {
    return AddressCardV1.observedAttributes;
  }

  get observedEvents() {
    return [`clickedCity`];
  }
}

customElements.define(`address-card-v1`, AddressCardV1);
customElements.define(`address-card-v2`, AddressCardV2);
customElements.define(`address-card`, AddressCard);

customElements.define(`proxy-app`, class extends ProxyComponent {
  get config() {
    return {
      template: () => h(`div`, [
        h(`a`, { attrs: { href: `?` } }, `Try v1 `),
        h(`a`, { attrs: { href: `?use_experimental_card` } }, `Try v2`),
        h(`address-card`, {
          attrs: {name: `Ben`, city: `San Francisco`},
          on: {clickedCity: () => alert(`it's true!`)}
        }),
        ]
      )
    };
  }
});
