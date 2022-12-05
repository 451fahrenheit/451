
describe('User navigates to search tab ', () => {
	describe('user inputs the title', () => {
		const searchSelector = '[data-cy=search]';
		const emailSelector = '[data-cy=email]';
		const passwordSelector = '[data-cy=password]';
		const searchResults = '[data-cy=searchResults]';
		const titleResults = '[data-cy=title]';
		const registerSelector = '[aria-label=register]';
		const searchButton = '[data-cy=searchButton]';
		const errorSelector = '[data-cy=errorMessage]';
		const addTitle = '[data-cy=addTitle]';


		it('returns search results', () => {
			cy.visit('/login');
			cy.get(emailSelector).type('cultivatesharing@gmail.com', { force: true });
			cy.get(passwordSelector).type('Alpha@451', { force: true });
			cy.get(registerSelector).click({force: true});

			// Arrange
			cy.get('a[data-cy=search-nav]').click();
			cy.get(searchSelector).type('flowers', { force: true });
			//Act
			cy.get(searchButton).click({force: true});
			// Assert
			cy.get(searchResults).contains('Growing Flowers');		

		});
		it('throws required error when search is clicked without any input', () => {
			cy.visit('/login');
			cy.get(emailSelector).type('cultivatesharing@gmail.com', { force: true });
			cy.get(passwordSelector).type('Alpha@451', { force: true });
			cy.get(registerSelector).click({force: true});
			// Arrange
			cy.get('a[data-cy=search-nav]').click();
			//Act
			cy.get(searchButton).click({force: true});
			// Assert
			cy.get(errorSelector).should('have.text','Enter text to search.');

		});
		
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
			// Assert
			cy.get(titleResults).eq(0).click();
			cy.url().should('include', '/search/titles/WVLXDwAAQBAJ');

		});

		it('on clicking add button of a title adds the title to my library', () => {
			cy.visit('/login');
			cy.get(emailSelector).type('cultivatesharing@gmail.com', { force: true });
			cy.get(passwordSelector).type('Alpha@451', { force: true });
			cy.get(registerSelector).click({force: true});
			// Arrange
			cy.get('a[data-cy=search-nav]').click();
			cy.get(searchSelector).type('flowers', { force: true });
			//Act
			cy.get(searchButton).click({force: true});
			// Assert
			cy.get(addTitle).eq(0).click();
			cy.url().should('include', '/library');
			cy.contains('The Flower Book');

		});
	});
});