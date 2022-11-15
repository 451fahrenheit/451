describe('User provides email and password ', () => {
	describe('Email and password are valid', () => {
		const emailSelector = '[data-cy=email]';
		const passwordSelector = '[data-cy=password]';
		const registerSelector = '[aria-label=register]';
		it('redirects to login page', () => {
			cy.visit('/register');
			// Arrange
			cy.get(emailSelector).type('alpha@gmail.com', { force: true });
			cy.get(passwordSelector).type('Alpha@271', { force: true });
			//Act
			cy.get(registerSelector).click({force: true});
			// Assert
			cy.url().should('include', '/login');
			cy.get('h1').should('contain', 'Login');
		});
	});
});