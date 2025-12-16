import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let token;
const baseUrl = "http://localhost:3000/api";

Given("que envio email e senha válidos", () => {
  cy.wrap({ email: "usuario@exemplo.com", password: "senha123" }).as("loginData");
});

When("faço a requisição POST para /api/login", function () {
  cy.request("POST", `${baseUrl}/login`, this.loginData).then((response) => {
    cy.wrap(response).as("loginResponse");
    token = response.body.token;
  });
});

Then("devo receber status 200", function () {
  expect(this.loginResponse.status).to.eq(200);
});

Then("um token JWT válido", function () {
  expect(this.loginResponse.body).to.have.property("token");
});