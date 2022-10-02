import inventoryPage from '../support/pageObjects/inventoryPage'
import loginPage from '../support/pageObjects/loginPage'
import users from '../fixtures/users.json'
import assertionTexts from '../fixtures/assertionTexts.json'
import cartHelper from '../support/cartHelper'
import checkoutPages from '../support/pageObjects/checkoutPages'

describe('Inventory page tests', () => {
	afterEach(() => {
		cy.reload()
	})

	it(
		'checks if visiting inventory page without logging in should redirects to login page',
		{ tags: ['@smoke', '@all'] },
		() => {
			inventoryPage.goTo()
			cy.url().should('not.contain', Cypress.env('paths').inventoryPage)
			loginPage
				.getErrorMessage()
				.should(
					'contain',
					assertionTexts.loginPage.notLoggedIn.replace(
						'{page}',
						Cypress.env('paths').inventoryPage
					)
				)
		}
	)

	it(
		'checks if visiting inventory page by locked out user should redirects to login page',
		{ tags: ['@all'] },
		() => {
			inventoryPage.loginWithCookie(users.lockedOutUser.login)
			inventoryPage.goTo()
			cy.url().should('eq', Cypress.config('baseUrl') + '/')
			loginPage
				.getErrorMessage()
				.should(
					'contain',
					assertionTexts.loginPage.notLoggedIn.replace(
						'{page}',
						Cypress.env('paths').inventoryPage
					)
				)
		}
	)

	it('checks empty cart state', { tags: ['@all'] }, () => {
		inventoryPage.loginWithCookie(users.standardUser.login)
		inventoryPage.goTo()
		inventoryPage.checkNumberOfItemsInCart(0)
		inventoryPage.clickCartButton()
		checkoutPages.checkNumberOfItemsListed(0)
	})

	it('checks adding single item to cart', { tags: ['@all'] }, () => {
		inventoryPage.loginWithCookie(users.standardUser.login)
		inventoryPage.goTo()
		inventoryPage.clickAddItemToCart('bikeLight')
		inventoryPage.checkNumberOfItemsInCart(1)
	})

	it(
		'checks adding multiple items to cart',
		{ tags: ['@smoke', '@all'] },
		() => {
			inventoryPage.loginWithCookie(users.standardUser.login)
			inventoryPage.goTo()
			inventoryPage.clickAddItemToCart('bikeLight')
			inventoryPage.clickAddItemToCart('jacket')
			inventoryPage.clickAddItemToCart('redTshirt')
			inventoryPage.checkNumberOfItemsInCart(3)
		}
	)

	it(
		'removing item from cart from inventory page',
		{ tags: ['@smoke', '@all'] },
		() => {
			inventoryPage.loginWithCookie(users.standardUser.login)
			cartHelper.addToCart('backpack')
			inventoryPage.goTo()
			inventoryPage.checkNumberOfItemsInCart(1)
			inventoryPage.clickRemoveItemFromCart('backpack')
			inventoryPage.getRemoveItemfromCartButton('jacket').should('not.exist')
			inventoryPage.checkNumberOfItemsInCart(0)
		}
	)
})
