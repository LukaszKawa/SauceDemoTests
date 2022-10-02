import items from '../fixtures/items.json'

export class cartHelper {
	static cartContent = 'cart-contents'

	static getCart() {
		let cart = cy.getLocalStorage('cart-contents')
		return cart.length > 0 ? cart : {}
	}

	static addToCart(itemName) {
		let currentCart = Object.values(this.getCart())
		let itemToAdd = items[itemName].itemId
		let newCart = Cypress._.concat(currentCart, itemToAdd)
		cy.setLocalStorage(this.cartContent, '[' + newCart + ']')
	}

	static clearCart() {
		cy.removeLocalStorage()
	}
}

export default cartHelper
