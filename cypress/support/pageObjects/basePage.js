export class basePage {
	static checkLoggedUser(login) {
		return cy
			.getCookie('session-username')
			.should('have.property', 'value', login)
	}

	static loginWithCookie(login) {
		return cy.addCookie('session-username', login)
	}
}
export default basePage
