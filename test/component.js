describe('<what-ever>', function() {
  var el;
  before(function() {
    el = document.getElementById('foo');
  });
  it('finds stuff in the dom', function() {
    expect(el.id).to.equal('foo');
  });
});
