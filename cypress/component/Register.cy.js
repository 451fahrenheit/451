/* eslint-disable import/no-unresolved */
import Register from '../../src/components/Register';
describe('<Register>', () => {
	it('mounts', () => {
		cy.mount(<Register />);
	});

	// Set up some constants for the selectors
	const emailSelector = '[data-cy=email]';
	const passwordSelector = '[data-cy=email]';
	const registerSelector = '[aria-label=register]';
	const errorSelector = '[data-cy=error]';
	
	it('register on invaild email should return invalid email', () => {
		// Arrange
		cy.mount(<Register />);
		//Act
		cy.get(registerSelector).click();
		// Assert
		cy.get(errorSelector).should('have.text', 'Enter a valid email');
	});
	

});