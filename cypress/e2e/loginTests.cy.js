import loginPage from '../support/pageObjects/loginPage'
import users from '../fixtures/users.json'
import { faker } from '@faker-js/faker'
import assertionTexts from '../fixtures/assertionTexts.json'

describe('Login test cases', () => {
	beforeEach(() => {
		loginPage.goTo()
		cy.clearCookies()
	})
	it(
		'checks login for standard_user with valid password',
		{ tags: ['@smoke', '@all'] },
		() => {
			loginPage.loginWithCredentials(
				users.standardUser.login,
				users.standardUser.password
			)
			loginPage.getErrorMessage().should('not.exist')
			cy.url().should(
				'eq',
				Cypress.config('baseUrl') + Cypress.env('paths').inventoryPage
			)
			cy.screenshot()
		}
	)

	it('checks login with invalid password', { tags: ['@smoke', '@all'] }, () => {
		loginPage.loginWithCredentials(
			users.standardUser.login,
			faker.internet.password()
		)
		loginPage
			.getErrorMessage()
			.should('contain', assertionTexts.loginPage.invalidPassword)
		cy.url().should('not.contain', Cypress.env('paths').inventoryPage)
	})

	it('attempt to login without password', { tags: ['@all'] }, () => {
		loginPage.enterLogin(users.standardUser.login)
		loginPage.clickLoginButton()
		loginPage
			.getErrorMessage()
			.should('contain', assertionTexts.loginPage.passwordRequired)
		cy.url().should('not.contain', Cypress.env('paths').inventoryPage)
	})

	it(
		'checks login for locked_out_user with valid password',
		{ tags: ['@smoke', '@all'] },
		() => {
			loginPage.loginWithCredentials(
				users.lockedOutUser.login,
				users.lockedOutUser.password
			)
			loginPage
				.getErrorMessage()
				.should('contain', assertionTexts.loginPage.lockedOut)
			cy.url().should('not.contain', Cypress.env('paths').inventoryPage)
		}
	)

	it(
		'checks login for problem_user with valid password',
		{ tags: ['@all'] },
		() => {
			loginPage.loginWithCredentials(
				users.problemUser.login,
				users.problemUser.password
			)
			cy.url().should(
				'eq',
				Cypress.config('baseUrl') + Cypress.env('paths').inventoryPage
			)
			loginPage.checkLoggedUser(users.problemUser.login)
		}
	)

	it(
		'checks login for performance_glitch_user with valid password',
		{ tags: ['@all'] },
		() => {
			loginPage.loginWithCredentials(
				users.performanceGlitchUser.login,
				users.performanceGlitchUser.password
			)
			cy.url().should(
				'eq',
				Cypress.config('baseUrl') + Cypress.env('paths').inventoryPage
			)
			loginPage.checkLoggedUser(users.performanceGlitchUser.login)
		}
	)
})
