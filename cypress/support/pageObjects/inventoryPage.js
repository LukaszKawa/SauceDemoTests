import navigationMenu from './navigationMenu'
import items from '../../fixtures/items.json'

export class inventoryPage extends navigationMenu {
	static goTo() {
		cy.visit(Cypress.env('paths').inventoryPage, { failOnStatusCode: false })
	}

	static clickAddItemToCart(itemName) {
		cy.getByTestTag(`add-to-cart-${items[itemName].testTag}`).click()
	}

	static getRemoveItemfromCartButton(itemName) {
		return cy.getByTestTag(`remove-${items[itemName].testTag}`)
	}

	static clickRemoveItemFromCart(itemName) {
		this.getRemoveItemfromCartButton(itemName).click()
	}
}
export default inventoryPage
