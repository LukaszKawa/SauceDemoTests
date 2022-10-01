const { defineConfig } = require('cypress')

module.exports = defineConfig({
	env: {
		grepFilterSpecs: false,
		grepOmitFiltered: false,
		paths: {
			inventoryPage: '/inventory.html',
		},
	},
	e2e: {
		setupNodeEvents(on, config) {
			require('cypress-grep/src/plugin')(config)
			require('cypress-fail-fast/plugin')(on, config)
			return config
		},
		baseUrl: 'https://www.saucedemo.com',
		specPattern: 'cypress/e2e/*.js',
		viewportWidth: 1920,
		viewportHeight: 1080,
		defaultCommandTimeout: 6000,
		watchForFileChanges: false,
		video: false,
		trashAssetsBeforeRuns: true,
		//experimentalWebKitSupport: true
	},
})
