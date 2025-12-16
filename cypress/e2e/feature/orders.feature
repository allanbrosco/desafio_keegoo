Feature: Pedidos
  Scenario: Listar pedidos do usuário
    Given que estou autenticado
    When envio uma requisição GET para /api/orders?userId=1
    Then devo receber status 200
    And uma lista de pedidos