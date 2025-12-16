 Feature: Produtos
  Scenario: Listar produtos com paginação
    When envio uma requisição GET para /api/produtos?page=1&limit=5
    Then devo receber status 200
    And uma lista de produtos

  Scenario: Obter detalhes de um produto
    When envio uma requisição GET para /api/produtos/101
    Then devo receber status 200
    And os detalhes do produto com id 101