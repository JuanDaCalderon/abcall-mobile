describe('prueba test abcall mobile', () => {
  it('prueba mobile', () => {
    cy.visit('/');
    cy.get('[data-cy="btn-tab2"]').click();
    expect(2).to.equal(2);
  });
});
