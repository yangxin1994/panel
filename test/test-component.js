describe('Simple Component instance', function() {
  var el;

  beforeEach(function() {
    document.body.innerHTML = '';
    el = document.createElement('simple-app');
  });

  it('does not affect the DOM until attached', function(done) {
    expect(document.getElementsByClassName('foo')).to.be.empty;
    window.requestAnimationFrame(function() {
      expect(document.getElementsByClassName('foo')).to.be.empty;
      done();
    });
  });

  context('when attached to DOM', function() {
    beforeEach(function(done) {
      document.body.appendChild(el);
      window.requestAnimationFrame(function() {
        done();
      });
    });

    it('renders its template', function() {
      expect(document.getElementsByClassName('foo')).to.have.lengthOf(1);
      expect(el.children).to.have.lengthOf(1);
      expect(el.children[0].className).to.equal('foo');
    });

    it('injects default state into templates', function() {
      expect(el.textContent).to.contain('Value of foo: bar');
    });

    it('injects helpers into templates', function() {
      expect(el.textContent).to.contain('Foo capitalized: Bar');
    });

    it('re-renders when state is updated', function(done) {
      expect(el.textContent).to.contain('Value of foo: bar');
      expect(el.textContent).to.contain('Foo capitalized: Bar');
      el.update({foo: 'new value'});
      window.requestAnimationFrame(function() {
        expect(el.textContent).to.contain('Value of foo: new value');
        expect(el.textContent).to.contain('Foo capitalized: New value');
        done();
      });
    });
  });
});

describe('Nested Component instance', function() {
  var el, childEl;

  beforeEach(function(done) {
    document.body.innerHTML = '';
    el = document.createElement('nested-app');
    document.body.appendChild(el);
    window.requestAnimationFrame(function() {
      childEl = el.getElementsByTagName('nested-child')[0];
      done();
    });
  });

  it('renders the parent component', function() {
    expect(document.getElementsByClassName('nested-foo')).to.have.lengthOf(1);
    expect(el.children).to.have.lengthOf(1);
    expect(el.children[0].className).to.equal('nested-foo');
  });

  it('renders the child component', function() {
    expect(document.getElementsByClassName('nested-foo-child')).to.have.lengthOf(1);
    expect(childEl.children[0].className).to.equal('nested-foo-child');
  });

  it('passes parent state to the child component', function() {
    expect(childEl.textContent).to.include('parent title: test');
  });

  it('passes attributes to the child component', function() {
    expect(childEl.textContent).to.include('animal: llama');
  });

  it('passes state updates from parent to child', function(done) {
    expect(childEl.textContent).to.include('animal: llama');
    el.update({animal: 'capybara'});
    window.requestAnimationFrame(function() {
      expect(childEl.textContent).to.include('animal: capybara');
      done();
    });
  });

  it('passes state updates from child to parent', function(done) {
    expect(el.textContent).to.include('Nested app: test');
    expect(childEl.textContent).to.include('parent title: test');
    childEl.update({title: 'new title'});
    window.requestAnimationFrame(function() {
      expect(el.textContent).to.include('Nested app: new title');
      expect(childEl.textContent).to.include('parent title: new title');
      done();
    });
  });
});
