describe('prueba test abcall mobile', () => {
  it('prueba Login mobile', () => {
    cy.visit('/');
    const emailInput = cy.get('[data-cy="email-input"]');
    const passwordInput = cy.get('[data-cy="password-input"]');
    const submitButton = cy.get('[data-cy="submit-button"]');
    emailInput.click();
    emailInput.type('usuario1@gmail.com');
    emailInput.children().clear();
    passwordInput.click();
    cy.get('[data-cy="email-error-required"]').should('exist');
    emailInput.click();
    emailInput.type('juandacasljigmailcom');
    cy.get('[data-cy="email-error-format"]').should('exist');
    cy.get('[data-cy="password-error-required"]').should('exist');
    emailInput.clear();
    emailInput.type('usuario1@gmail.com');
    passwordInput.type('123456789');
    submitButton.click();
  });
});
