# Using ProxyComponent

The example in this directory demonstrates the use of ProxyComponent as an interface to delegate dynamically to different child components at runtime. The `address-card` proxy of the example chooses between the `address-card-v1` and `address-card-v2` components based on internal logic (in this case, the URL string or one of its attributes):

```js
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
```

To install and run the example from this directory: `npm install && npm start`. The page will be served on `localhost:8080` by Webpack dev server.
