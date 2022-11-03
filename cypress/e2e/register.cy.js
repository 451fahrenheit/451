describe('User provides email and password ', () => {
	describe('Email and password are valid', () => {
		it('redirects to login page', () => {
			cy.visit('/register');
			cy.get('#email').type('cultivatesharing@gmail.com');
			cy.get('input[name=password]').type('12345678');

			cy.get('register').click();

			cy.url().should('include', '/login');
			cy.get('h1').should('contain', 'Login');
		});
	});
});