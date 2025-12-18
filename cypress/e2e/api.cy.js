describe("Testes de API - QA Commerce", () => {
  let token;
  const baseUrl = "http://localhost:3000/api";

  it("POST - Login de usuário", () => {
    cy.request("POST", "/login", {
    email: Cypress.env("email"),
    password: Cypress.env("password")
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
      token = response.body.token;
    });
  });

  it("GET - Listar produtos", () => {
    cy.request("GET", `${baseUrl}/produtos?page=1&limit=5`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("products");
      });
  });

  it("POST - Adicionar produto ao carrinho", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/carrinho`,
      headers: { Authorization: `Bearer ${token}` },
      body: { userId: 1, productId: 101, quantity: 2 }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("message");
    });
  });

  it("POST - Finalizar pedido", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/checkout`,
      headers: { Authorization: `Bearer ${token}` },
      body: {
        userId: 1,
        firstName: "John",
        lastName: "Doe",
        address: "123 Main St",
        number: "456",
        cep: "12345678",
        phone: "1234567890",
        email: "john.doe@example.com",
        paymentMethod: "credit_card",
        cardNumber: "1234123412341234",
        cardExpiry: "12/2025",
        cardCvc: "123"
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("orderNumber");
    });
  });
});