import itemPage from '../support/pageObjects/itemPage'
import cartHelper from '../support/cartHelper'
import loginPage from '../support/pageObjects/loginPage'
import assertionTexts from '../fixtures/assertionTexts.json'
import users from '../fixtures/users.json'
import items from '../fixtures/items.json'
describe('inventory page tests', () => {
	afterEach(() => {
		cy.reload()
	})

	it(
		'visiting item page without logging in',
		{ tags: ['@smoke', '@all'] },
		() => {
			itemPage.goToItemPage('bikeLight')
			cy.url().should('deep.equal', Cypress.config('baseUrl') + '/')
			loginPage
				.getErrorMessage()
				.should(
					'contain',
					assertionTexts.loginPage.notLoggedIn.replace(
						'{page}',
						Cypress.env('paths').itemPage
					)
				)
		}
	)

	it('basic checks for item page', { tags: ['@all'] }, () => {
		const item = 'bikeLight'
		itemPage.loginWithCookie(users.standardUser.login)
		itemPage.goToItemPage(item)
		itemPage.getItemName().should('contain', items[item].fullName)
		itemPage.getItemPrice().should('contain', items[item].price)
	})

	it('adding item from item page', { tags: ['@smoke', '@all'] }, () => {
		itemPage.loginWithCookie(users.standardUser.login)
		itemPage.goToItemPage('bikeLight')
		itemPage.clickAddToCart('bikeLight')
		itemPage.getAddToCartButton().should('not.exist')
		itemPage.getRemoveButton().should('be.visible')
		itemPage.checkNumberOfItemsInCart(1)
	})

	it(
		'checks removing item from item page',
		{ tags: ['@smoke', '@all'] },
		() => {
			itemPage.loginWithCookie(users.standardUser.login)
			cartHelper.addToCart('onesie')
			itemPage.goToItemPage('onesie')
			itemPage.checkNumberOfItemsInCart(1)
			itemPage.clickRemoveButton()
			itemPage.checkNumberOfItemsInCart(0)
		}
	)

	it(
		'checks adding another item from item page',
		{ tags: ['@smoke', '@all'] },
		() => {
			itemPage.loginWithCookie(users.standardUser.login)
			cartHelper.addToCart('onesie')
			itemPage.goToItemPage('backpack')
			itemPage.checkNumberOfItemsInCart(1)
			itemPage.clickAddToCart()
			itemPage.checkNumberOfItemsInCart(2)
		}
	)

	it('checks getting back to products button', { tags: ['@all'] }, () => {
		itemPage.loginWithCookie(users.standardUser.login)
		itemPage.goToItemPage('jacket')
		itemPage.clickBackToProductsButton()
		cy.url().should(
			'eq',
			Cypress.config('baseUrl') + Cypress.env('paths').inventoryPage
		)
	})

	it('checks proceeding to checkout', { tags: ['@all'] }, () => {
		itemPage.loginWithCookie(users.standardUser.login)
		itemPage.goToItemPage('redTshirt')
		itemPage.clickAddToCart()
		itemPage.clickCartButton()
		cy.url().should(
			'eq',
			Cypress.config('baseUrl') + Cypress.env('paths').cartPage
		)
	})
})
