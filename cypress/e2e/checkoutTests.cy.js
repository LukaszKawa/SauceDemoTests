import checkoutPages from '../support/pageObjects/checkoutPages'
import inventoryPage from '../support/pageObjects/inventoryPage'
import loginPage from '../support/pageObjects/loginPage'
import { faker } from '@faker-js/faker'
import users from '../fixtures/users.json'
import assertionTexts from '../fixtures/assertionTexts.json'
import cartHelper from '../support/cartHelper'

describe('checkout tests', () => {
	afterEach(() => {
		cy.reload()
	})

	it(
		'checks if visiting checkout page without logging in should redirects to login page',
		{ tags: ['@smoke', '@all'] },
		() => {
			checkoutPages.goTo()
			cy.url().should('not.contain', Cypress.env('paths').inventoryPage)
			loginPage
				.getErrorMessage()
				.should(
					'contain',
					assertionTexts.loginPage.notLoggedIn.replace(
						'{page}',
						Cypress.env('paths').cartPage
					)
				)
		}
	)

	it('empty cart state', { tags: ['@all'] }, () => {
		checkoutPages.loginWithCookie(users.standardUser.login)
		checkoutPages.goTo()
		checkoutPages.checkNumberOfItemsListed(0)
	})

	it('removing item on cart page', { tags: ['@all'] }, () => {
		const item = 'onesie'
		checkoutPages.loginWithCookie(users.standardUser.login)
		cartHelper.addToCart(item)
		checkoutPages.goTo()
		checkoutPages.clickRemoveItemFromCart(item)
		inventoryPage.checkNumberOfItemsInCart(0)
	})

	it(
		'checks checkout with multiple items in cart',
		{ tags: ['@smoke', '@all'] },
		() => {
			inventoryPage.loginWithCookie(users.standardUser.login)
			inventoryPage.goTo()
			inventoryPage.clickAddItemToCart('bikeLight')
			inventoryPage.clickAddItemToCart('jacket')
			inventoryPage.clickAddItemToCart('redTshirt')
			inventoryPage.clickCartButton()
			checkoutPages.checkNumberOfItemsListed(3)
			checkoutPages.clickCheckoutButton()
			checkoutPages.enterCheckoutInfo(
				faker.name.firstName(),
				faker.name.lastName(),
				faker.address.zipCode()
			)
			checkoutPages.clickContinueButton()
			checkoutPages.checkNumberOfItemsListed(3)
			checkoutPages.getSubtotal().should('contain', '75.97')
			checkoutPages.clickFinishButton()
			cy.contains(assertionTexts.checkoutPage.orderConfirmation).should(
				'be.visible'
			)
		}
	)
})
