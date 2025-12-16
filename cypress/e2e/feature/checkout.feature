Feature: Checkout
  Scenario: Finalizar pedido com dados válidos
    Given que estou autenticado
    When envio uma requisição POST para /api/checkout com dados obrigatórios
    Then devo receber status 201
    And um número de pedido válido