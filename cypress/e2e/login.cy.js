
describe('User provides email and password ', () => {
	describe('Email and password are valid', () => {
		const emailSelector = '[data-cy=email]';
		const passwordSelector = '[data-cy=password]';
		const registerSelector = '[aria-label=register]';
		const errorSelector = '[data-cy=errorMessage]';

		it('throws user not found error when a new email is entered', () => {
			cy.visit('/login');
			const randomString = (Math.random() + 1).toString(36).substring(7);
			const email = randomString+'@gmail.com';
			// Arrange
			cy.get(emailSelector).type(email, { force: true });
			cy.get(passwordSelector).type('Alpha@271', { force: true });
			//Act
			cy.get(registerSelector).click({force: true});
			// Assert
			cy.get(errorSelector).should('have.text','Account not found, create an account or check for spelling in existing');

		});
		it('redirects to dashboard page', () => {
			cy.visit('/login');
			// Arrange
			cy.get(emailSelector).type('cultivatesharing@gmail.com', { force: true });
			cy.get(passwordSelector).type('Alpha@451', { force: true });
			//Act
			cy.get(registerSelector).click({force: true});
			// Assert
			cy.url().should('include', '/dashboard');

		});
		
		it('throws when password is incorrect', () => {
			cy.visit('/login');
			// Arrange
			cy.get(emailSelector).type('cultivatesharing@gmail.com', { force: true });
			cy.get(passwordSelector).type('Alpha@271', { force: true });
			//Act
			cy.get(registerSelector).click({force: true});
			// Assert
			cy.get(errorSelector).should('have.text', 'Incorrect password, check if capslock is on');
		});
	});
});