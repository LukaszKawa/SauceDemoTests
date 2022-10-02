import navigationMenu from './navigationMenu'
import items from '../../fixtures/items.json'
export class itemPage extends navigationMenu {
	static goToItemPage(itemName) {
		cy.visit(Cypress.env('paths').itemPage + '?id=' + items[itemName].itemId, {
			failOnStatusCode: false,
		})
	}

	static getAddToCartButton() {
		return cy.get('button').contains('Add to cart')
	}
	static clickAddToCart() {
		this.getAddToCartButton().click()
	}

	static getRemoveButton() {
		return cy.get('button').contains('Remove')
	}

	static clickRemoveButton() {
		this.getRemoveButton().click()
	}

	static clickBackToProductsButton() {
		cy.getByTestTag('back-to-products').click()
	}

	static getItemName() {
		return cy.get('.inventory_details_name')
	}

	static getItemPrice() {
		return cy.get('.inventory_details_price')
	}
}

export default itemPage
