describe('crear incidente', () => {
    it('prueba Login mobile', () => {
        cy.visit('http://localhost:8100');
        const emailInput = cy.get('[data-cy="email-input"]');
        const passwordInput = cy.get('[data-cy="password-input"]');
        const submitButton = cy.get('[data-cy="submit-button"]');

        emailInput.type('usuario1@gmail.com');
        passwordInput.type('123456789');
        submitButton.click();

        cy.visit('http://localhost:8100/home/chatbot')
        cy.wait(2000);
        cy.get('[data-cy="chatbot-input"]').type('A');
        cy.get('[data-cy="chatbot-submit"]').click();
        cy.wait(2000);
        cy.get('[data-cy="chatbot-input"]').type('1');
        cy.wait(2000);
        cy.get('[data-cy="chatbot-submit"]').click();
        cy.wait(2000);
        cy.visit('http://localhost:8100');
    });
});
