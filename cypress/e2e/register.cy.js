describe('User provides email and password ', () => {
	describe('Email and password are valid', () => {
		const emailSelector = '[data-cy=email]';
		const passwordSelector = '[data-cy=password]';
		const registerSelector = '[aria-label=register]';
		it('redirects to login page', () => {
			cy.visit('/register');
			cy.get(emailSelector).type('cultivatesharing@gmail.com');
			cy.get(passwordSelector).type('alphA@12345678');

			cy.get(registerSelector).click();

			cy.url().should('include', '/login');
			cy.get('h1').should('contain', 'Login');
		});
	});
});