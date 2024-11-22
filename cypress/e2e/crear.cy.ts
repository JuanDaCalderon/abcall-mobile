describe('crear incidente', () => {

    const mockIncidente = {
        correoUsuario: 'prueba@pruebas.com',
        direccionUsuario: 'Calle 123',
        telefonoUsuario: '30012345678',
        descripcionProblema: 'mi pc no conecta a internet',
        comentario: 'Comentario incidente',
    };

    it('prueba crear incidente exitoso mobile', () => {
        cy.visit('http://localhost:8100');
        const emailInput = cy.get('[data-cy="email-input"]');
        const passwordInput = cy.get('[data-cy="password-input"]');
        const submitButton = cy.get('[data-cy="submit-button"]');
        emailInput.type('usuario1@gmail.com');
        passwordInput.type('123456789');
        cy.wait(1000);
        submitButton.click();
        cy.wait(2000);

        cy.visit('http://localhost:8100/home/crear_incidente')
        cy.get('[data-cy="customer-select"]').click();
        cy.wait(1000);
        cy.get('.alert-radio-label').eq(0).click();
        cy.wait(1000);
        cy.get('.alert-button').contains('OK').click();
        cy.get('[data-cy="email-input"]').click();
        cy.get('[data-cy="email-input"]').type(mockIncidente.correoUsuario);
        cy.wait(2000);
        cy.get('[data-cy="user-address"]').type(mockIncidente.direccionUsuario);
        cy.get('[data-cy="phone-number"]').type(mockIncidente.telefonoUsuario);
        cy.get('[data-cy="issue-description"]').type(mockIncidente.descripcionProblema);
        cy.get('[data-cy="issue-priority"]').click();
        cy.wait(1000);
        cy.get('.alert-radio-label').eq(0).click();;
        cy.wait(1000);
        cy.get('.alert-button').contains('OK').click();
        cy.get('[data-cy="issue-type"]').click();
        cy.wait(1000);
        cy.get('.alert-radio-label').eq(0).click();;
        cy.wait(1000);
        cy.get('.alert-button').contains('OK').click();
        cy.get('[data-cy="issue-comment"]').click();
        cy.get('[data-cy="issue-comment"]').type(mockIncidente.comentario);
        cy.wait(1000);
        cy.get('[data-cy="create-issue-button"]').click();
        cy.get('ion-alert button').eq(0).click();
        cy.wait(2000);
        cy.get('[data-cy="create-issue-button"]').click();
        cy.get('ion-alert button').eq(1).click();
        cy.wait(2000);
    });

    it('prueba error crear incidente mobile', () => {
        cy.visit('http://localhost:8100');
        const emailInput = cy.get('[data-cy="email-input"]');
        const passwordInput = cy.get('[data-cy="password-input"]');
        const submitButton = cy.get('[data-cy="submit-button"]');
        emailInput.type('usuario1@gmail.com');
        passwordInput.type('123456789');
        cy.wait(1000);
        submitButton.click();
        cy.wait(2000);

        cy.visit('http://localhost:8100/home/crear_incidente')
        cy.get('[data-cy="customer-select"]').click();
        cy.wait(1000);
        cy.get('.alert-radio-label').eq(0).click();;
        cy.wait(1000);
        cy.get('.alert-button').contains('OK').click();
        cy.get('[data-cy="email-input"]').click();
        cy.get('[data-cy="email-input"]').type(mockIncidente.correoUsuario);
        cy.wait(2000);
        cy.get('[data-cy="user-address"]').type(mockIncidente.direccionUsuario);
        cy.get('[data-cy="phone-number"]').type(mockIncidente.telefonoUsuario);
        cy.get('[data-cy="issue-priority"]').click();
        cy.wait(1000);
        cy.get('.alert-radio-label').eq(0).click();;
        cy.wait(1000);
        cy.get('.alert-button').contains('OK').click();
        cy.get('[data-cy="issue-type"]').click();
        cy.wait(1000);
        cy.get('.alert-radio-label').eq(0).click();
        cy.wait(1000);
        cy.get('.alert-button').contains('OK').click();
        cy.get('[data-cy="issue-comment"]').click();
        cy.get('[data-cy="issue-comment"]').type(mockIncidente.comentario);
        cy.wait(1000);
        cy.get('[data-cy="create-issue-button"]').click();
        cy.wait(2000);
    });

    it('prueba cerrar sesión crear incidente mobile', () => {
        cy.visit('http://localhost:8100');
        const emailInput = cy.get('[data-cy="email-input"]');
        const passwordInput = cy.get('[data-cy="password-input"]');
        const submitButton = cy.get('[data-cy="submit-button"]');
        emailInput.type('usuario1@gmail.com');
        passwordInput.type('123456789');

        cy.wait(1000);
        submitButton.click();
        cy.wait(2000);
        cy.visit('http://localhost:8100/home/crear_incidente')
        cy.wait(2000);
        cy.get('[data-cy="logout-button"]').click();
        cy.wait(1000);
        cy.get('ion-alert button').eq(0).click();
        cy.wait(2000);
        cy.get('[data-cy="logout-button"]').click();
        cy.wait(1000);
        cy.get('ion-alert button').eq(1).click();
        cy.wait(2000);
    });

    it('prueba campos vacíos crear incidente mobile', () => {
        cy.visit('http://localhost:8100');
        const emailInput = cy.get('[data-cy="email-input"]');
        const passwordInput = cy.get('[data-cy="password-input"]');
        const submitButton = cy.get('[data-cy="submit-button"]');
        emailInput.type('usuario1@gmail.com');
        passwordInput.type('123456789');
        cy.wait(1000);
        submitButton.click();
        cy.wait(2000);

        cy.visit('http://localhost:8100/home/crear_incidente')
        cy.wait(1000);
        cy.get('[data-cy="email-input"]').click();
        cy.wait(2000);
        cy.get('[data-cy="user-address"]').click();
        cy.wait(1000);
        cy.get('[data-cy="phone-number"]').click();
        cy.wait(1000);
        cy.get('[data-cy="issue-description"]').click();
        cy.wait(1000);
        cy.get('[data-cy="issue-comment"]').click();
        cy.wait(1000);
        cy.get('[data-cy="email-input"]').click();
        cy.wait(2000);
    });
});
