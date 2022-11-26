
describe('User searches for a title ', () => {
	describe('user selects a title', () => {
		const searchSelector = '[data-cy=search]';
		const emailSelector = '[data-cy=email]';
		const passwordSelector = '[data-cy=password]';
		// const searchResults = '[data-cy=searchResults]';
		const titleResults = '[data-cy=title]';
		const registerSelector = '[aria-label=register]';
		const searchButton = '[data-cy=searchButton]';
		// const errorSelector = '[data-cy=errorMessage]';
		const titleSelector = '[data-cy=titleSelector]';


		
		it('throws required error when search is clicked without any input', () => {
			cy.visit('/login');
			cy.get(emailSelector).type('cultivatesharing@gmail.com', { force: true });
			cy.get(passwordSelector).type('Alpha@451', { force: true });
			cy.get(registerSelector).click({force: true});
			// Arrange
			cy.get('a[data-cy=search-nav]').click();
			cy.get(searchSelector).type('flowers', { force: true });
			//Act
			cy.get(searchButton).click({force: true});
			cy.get(titleResults).eq(0).click();
			// Assert

			cy.url().should('include', '/search/titles/WVLXDwAAQBAJ');
			cy.get(titleSelector).should('have.text','The Flower Book');


		});
	});
});