describe('Component instance', function() {
  var el;

  beforeEach(function() {
    el = document.createElement('test-app');
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
      expect(el.textContent.trim()).to.equal('Value of foo: bar');
    });

    it('re-renders when state is updated', function(done) {
      expect(el.textContent.trim()).to.equal('Value of foo: bar');
      el.update({foo: 'new value'});
      window.requestAnimationFrame(function() {
        expect(el.textContent.trim()).to.equal('Value of foo: new value');
        done();
      });
    });
  });
});
