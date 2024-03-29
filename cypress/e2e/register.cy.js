describe('User provides email and password ', () => {
	describe('Email and password are valid', () => {
		const emailSelector = '[data-cy=email]';
		const passwordSelector = '[data-cy=password]';
		const registerSelector = '[aria-label=register]';
		const headingregisterSelector = '[data-cy=heading]';
		const errorSelector = '[data-cy=errorMessage]';


		it('redirects to login page', () => {
			cy.visit('/register');
			const randomString = (Math.random() + 1).toString(36).substring(7);
			const email = randomString+'@gmail.com';
			// Arrange
			cy.get(emailSelector).type(email, { force: true });
			cy.get(passwordSelector).type('Alpha@271', { force: true });
			//Act
			cy.get(registerSelector).click({force: true});
			// Assert
			cy.url().should('include', '/login');
			cy.get(headingregisterSelector).should('contain', 'Login');
		});
		
		it('throws when user already exists', () => {
			cy.visit('/register');
			const randomString = (Math.random() + 1).toString(36).substring(7);
			const email = randomString+'@gmail.com';
			// Arrange
			cy.get(emailSelector).type(email, { force: true });
			cy.get(passwordSelector).type('Alpha@271', { force: true });
			//Act
			cy.get(registerSelector).click({force: true});
			cy.visit('/register');
			cy.get(emailSelector).type(email, { force: true });
			cy.get(passwordSelector).type('Alpha@271', { force: true });
			cy.get(registerSelector).click({force: true});
			// Assert
			cy.get(errorSelector).should('have.text', 'Account already exists with this email.');
		});
	});
});