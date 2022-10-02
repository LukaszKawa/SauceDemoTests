import basePage from './basePage'

export class navigationMenu extends basePage {
	static opensideMenu() {
		cy.get('#react-burger-menu-btn').click()
	}

	static closeSideMenu() {
		cy.get('#react-burger-cross-btn').click()
	}

	static getSideMenuContent() {
		return cy.get('.bm-item-list')
	}

	static getCartBadge() {
		return cy.get('.shopping_cart_badge')
	}

	static clickCartButton() {
		cy.get('.shopping_cart_link').click()
	}
	static checkNumberOfItemsInCart(numberOfItems) {
		return numberOfItems === 0
			? this.getCartBadge().should('not.exist')
			: this.getCartBadge().should('have.text', numberOfItems)
	}
}
export default navigationMenu
