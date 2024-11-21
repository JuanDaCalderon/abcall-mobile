describe('crear incidente', () => {
    it('prueba Login mobile', () => {
        cy.visit('http://localhost:8100');
        const emailInput = cy.get('[data-cy="email-input"]');
        const passwordInput = cy.get('[data-cy="password-input"]');
        const submitButton = cy.get('[data-cy="submit-button"]');

        emailInput.type('usuario1@gmail.com');
        passwordInput.type('123456789');
        submitButton.click();

        cy.wait(2000);
        cy.visit('http://localhost:8100/home/crear_incidente')
        cy.wait(2000);
        cy.get('[data-cy="customer-select"]').click();
        cy.wait(2000);

        
        
    });
});
