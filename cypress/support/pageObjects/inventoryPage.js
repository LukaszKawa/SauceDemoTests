import basePage from 'basePage'

export class inventoryPage extends basePage {
	static goTo() {
		cy.visit(Cypress.env('paths').inventoryPage)
	}
}
export default inventoryPage
