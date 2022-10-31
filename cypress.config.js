const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080/",
    defaultCommandTimeout: 5000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    DEV_ENV: "http://localhost:8080/",
    PROD_ENV: "https://rubanero14.github.io/RSS-Feed-CP-Prototype-Vue3/",
  },
});
