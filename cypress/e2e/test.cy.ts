describe('prueba test abcall mobile', () => {
  it('prueba mobile', () => {
    cy.visit('/');
    cy.get('[data-cy="password-input"]').click();
    expect(2).to.equal(2);
  });
});
