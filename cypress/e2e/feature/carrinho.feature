Feature: Carrinho
  Scenario: Adicionar produto ao carrinho
    Given que estou autenticado
    When envio uma requisição POST para /api/carrinho com userId, productId e quantity
    Then devo receber status 201
    And mensagem de sucesso

  Scenario: Listar itens do carrinho
    Given que estou autenticado
    When envio uma requisição GET para /api/carrinho/1
    Then devo receber status 200
    And uma lista de itens

  Scenario: Remover produto específico do carrinho
    Given que estou autenticado
    When envio uma requisição DELETE para /api/carrinho/1/101
    Then devo receber status 200
    And mensagem de sucesso
