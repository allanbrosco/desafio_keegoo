const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/api",
    env: {
      email: "admin@qa.com",
      password: "admin"
    }
  }
});