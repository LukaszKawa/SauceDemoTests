import navigationMenu from './navigationMenu'
import items from '../../fixtures/items.json'
export class checkoutPages extends navigationMenu {
	static goTo() {
		cy.visit(Cypress.env('paths').cartPage, {
			failOnStatusCode: false,
		})
	}

	static getCartItems() {
		return cy.get('.cart_item')
	}

	static checkNumberOfItemsListed(numberOfItems) {
		this.getCartItems().should('have.length', numberOfItems)
	}

	static checkIfItemAdded(itemName) {
		this.getCartItems().should('contain', items[itemName].fullName)
	}

	static getRemoveItemfromCartButton(itemName) {
		return cy.getByTestTag(`remove-${items[itemName].testTag}`)
	}

	static clickRemoveItemFromCart(itemName) {
		this.getRemoveItemfromCartButton(itemName).click()
	}

	static clickCheckoutButton() {
		cy.getByTestTag('checkout').click()
	}

	static enterFirstName(firstName) {
		cy.getByTestTag('firstName').type(firstName)
	}
	static enterLastName(lastName) {
		cy.getByTestTag('lastName').type(lastName)
	}

	static enterZIP(zip) {
		cy.getByTestTag('postalCode').type(zip)
	}

	static enterCheckoutInfo(firstName, lastName, zip) {
		this.enterFirstName(firstName)
		this.enterLastName(lastName)
		this.enterZIP(zip)
	}

	static clickContinueButton() {
		cy.getByTestTag('continue').click()
	}

	static getSubtotal() {
		return cy.get('.summary_subtotal_label')
	}

	static clickFinishButton() {
		cy.getByTestTag('finish').click()
	}
}

export default checkoutPages
