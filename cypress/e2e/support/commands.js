// Comandos customizados para reuso
Cypress.Commands.add("loginAPI", () => {
  cy.request("POST", "http://localhost:3000/api/login", {
    email: "usuario@exemplo.com",
    password: "senha123"
  }).then((response) => {
    Cypress.env("token", response.body.token);
  });
});