export function getAuthHeaders() {
  return { Authorization: `Bearer ${Cypress.env("token")}` };
}