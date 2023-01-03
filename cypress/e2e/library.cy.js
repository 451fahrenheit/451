
describe('User navigates to library tab ', () => {
	describe('user library page', () => {
		const searchSelector = '[data-cy=search]';
		const emailSelector = '[data-cy=email]';
		const passwordSelector = '[data-cy=password]';
		const searchResults = '[data-cy=searchResults]';
		const titleResults = '[data-cy=title]';
		const registerSelector = '[aria-label=register]';
		const searchButton = '[data-cy=searchButton]';


		it('returns search results', () => {
			cy.visit('/login');
			cy.get(emailSelector).type('cultivatesharing@gmail.com', { force: true });
			cy.get(passwordSelector).type('Alpha@451', { force: true });
			cy.get(registerSelector).click({force: true});

			// Arrange
			cy.get('a[data-cy=library-nav]').click();
			cy.get(searchSelector).type('The Flower Book', { force: true });
			//Act
			cy.get(searchButton).click({force: true});
			// Assert
			cy.get(searchResults).contains('The Flower Book');		

		});

		
		it('on click a book title navigates to book page', () => {
			cy.visit('/login');
			cy.get(emailSelector).type('cultivatesharing@gmail.com', { force: true });
			cy.get(passwordSelector).type('Alpha@451', { force: true });
			cy.get(registerSelector).click({force: true});
			// Arrange
			cy.get('a[data-cy=library-nav]').click();
			//Act
			cy.get(titleResults).eq(0).click();
			// Assert
			cy.url().should('include', '/library/titles/15');

		});

	});
});