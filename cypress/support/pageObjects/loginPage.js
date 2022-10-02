export class loginPage {
	static goTo() {
		cy.visit(Cypress.config('baseUrl'))
	}

	static enterLogin(login) {
		return cy.getByTestTag('username').type(login)
	}

	static enterPassword(password) {
		return cy.getByTestTag('password').type(password)
	}

	static clickLoginButton() {
		return cy.getByTestTag('login-button').click()
	}

	static loginWithCredentials(login, password) {
		this.enterLogin(login)
		this.enterPassword(password)
		this.clickLoginButton()
	}

	static getErrorMessage() {
		return cy.getByTestTag('error')
	}
}
export default loginPage
