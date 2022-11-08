/* eslint-disable import/no-unresolved */
import Register from '../../src/components/Register';
import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache
} from '@apollo/client';
describe('<Register>', () => {
	// Set up some constants for the selectors
	const emailSelector = '[data-cy=email]';
	const passwordSelector = '[data-cy=password]';
	const registerSelector = '[aria-label=register]';
	const errorSelector = '[data-cy=errorMessage]';
	const emailTestData = ['abc@gmail', 'abc.com', 'abcdef'];
	const passwordTestData = ['1234', '1234567@', 'a2345678'];
	// beforeEach(() => {
	// 	// Arrange
	// 	const httpLink = createHttpLink({	uri: 'http://localhost:4000'
	// 	});
	// 	const client = new ApolloClient({
	// 		link: httpLink,
	// 		cache: new InMemoryCache()
	// 	});
	// 	cy.mount(<ApolloProvider client={client}><Register /> </ApolloProvider>);
	// });
	it('mounts', () => {

		// Arrange
		const httpLink = createHttpLink({	uri: 'http://localhost:4000'
		});
		const client = new ApolloClient({
			link: httpLink,
			cache: new InMemoryCache()
		});
		cy.mount(<ApolloProvider client={client}><Register /> </ApolloProvider>);
	});



	passwordTestData.forEach(passwordTest);
	function passwordTest(item){
		it('register on invaild password should return invalid password info', () => {
			const httpLink = createHttpLink({	uri: 'http://localhost:4000'
			});
			const client = new ApolloClient({
				link: httpLink,
				cache: new InMemoryCache()
			});
			cy.mount(<ApolloProvider client={client}><Register /> </ApolloProvider>);
			// Arrange
			cy.get(emailSelector).type('alpha@gmail.com', { force: true });
			cy.get(passwordSelector).type(item, { force: true });
			//Act
			cy.get(registerSelector).click({force: true});
			// Assert
			cy.get(errorSelector).should('have.text', 'Password should have a length of 8, should contain a character, a number, a letter');
		});
	}

	emailTestData.forEach(emailTest);
	function emailTest(item){
		it('register on invaild email should return invalid email info', () => {
			// Arrange
			const httpLink = createHttpLink({	uri: 'http://localhost:4000'
			});
			const client = new ApolloClient({
				link: httpLink,
				cache: new InMemoryCache()
			});
			cy.mount(<ApolloProvider client={client}><Register /> </ApolloProvider>);			
			cy.get(emailSelector).type(item, { force: true });
			cy.get(passwordSelector).type('item@3221Alp', { force: true });
			//Act
			cy.get(registerSelector).click({force: true});
			// Assert
			cy.get(errorSelector).should('have.text', 'Email should be in the format identity@yourmail.com');
		});
	}
	it('register on invaild email should return empty field', () => {
		// Arrange
		const httpLink = createHttpLink({	uri: 'http://localhost:4000'
		});
		const client = new ApolloClient({
			link: httpLink,
			cache: new InMemoryCache()
		});
		cy.mount(<ApolloProvider client={client}><Register /> </ApolloProvider>);		
		cy.get(passwordSelector).type('cultivatesharing@gmail.com', { force: true });
		//Act
		cy.get(registerSelector).click({force: true});
		// Assert
		cy.get(errorSelector).should('have.text', 'Fields cannot be blank');
	});
	it('register on invaild password should return empty fields', () => {
		const httpLink = createHttpLink({	uri: 'http://localhost:4000'
		});
		const client = new ApolloClient({
			link: httpLink,
			cache: new InMemoryCache()
		});
		cy.mount(<ApolloProvider client={client}><Register /> </ApolloProvider>);		
		//Act
		cy.get(registerSelector).click({force: true});
		// Assert
		cy.get(errorSelector).should('have.text', 'Fields cannot be blank');
	});
	it('register on invaild password should return empty fields', () => {
		// Arrange
		const httpLink = createHttpLink({	uri: 'http://localhost:4000'
		});
		const client = new ApolloClient({
			link: httpLink,
			cache: new InMemoryCache()
		});
		cy.mount(<ApolloProvider client={client}><Register /> </ApolloProvider>);			
		//Act
		cy.get(registerSelector).click({force: true});
		// Assert
		cy.get(errorSelector).should('have.text', 'Fields cannot be blank');
	});

});