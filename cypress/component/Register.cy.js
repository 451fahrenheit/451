/* eslint-disable import/no-unresolved */
import Register from '../../src/components/Register';
describe('<Register>', () => {
	it('mounts', () => {
		cy.mount(<Register />);
	});

	// Set up some constants for the selectors
	const emailSelector = '[data-cy=email]';
	const passwordSelector = '[data-cy=password]';
	const registerSelector = '[aria-label=register]';
	const errorSelector = '[data-cy=error]';
	const emailTestData = ['abc@gmail', 'abc.com', 'abcdef'];
	const passwordTestData = ['1234', '1234567@', 'a2345678', 'a@333333'];

	passwordTestData.forEach(passwordTest);
	function passwordTest(item){
		it('register on invaild password should return invalid password info', () => {
			// Arrange
			cy.mount(<Register />);
			//Act
			cy.get(emailSelector).type('alpha@gmail.com');
			cy.get(passwordSelector).type(item);
			cy.get(registerSelector).click();
			// Assert
			cy.get(errorSelector).should('have.text', 'Password should have a length of 8, should contain a character, a number, a letter');
		});
	}

	emailTestData.forEach(emailTest);
	function emailTest(item){
		it('register on invaild email should return invalid email info', () => {
			// Arrange
			cy.mount(<Register />);
			//Act
			cy.get(emailSelector).type(item);
			cy.get(passwordSelector).type('item@3221Alp');
			cy.get(registerSelector).click();
			// Assert
			cy.get(errorSelector).should('have.text', 'Email should be in the format identity@yourmail.com');
		});
	}
	it('register on invaild email should return empty field', () => {
		// Arrange
		cy.mount(<Register />);
		//Act
		cy.get(passwordSelector).type('cultivatesharing@gmail.com');
		cy.get(registerSelector).click();
		// Assert
		cy.get(errorSelector).should('have.text', 'Fields cannot be blank');
	});
	it('register on invaild password should return empty fields', () => {
		// Arrange
		cy.mount(<Register />);
		//Act
		cy.get(registerSelector).click();
		// Assert
		cy.get(errorSelector).should('have.text', 'Fields cannot be blank');
	});

});