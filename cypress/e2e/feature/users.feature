Feature: Usuários
  Scenario: Criar novo usuário
    When envio uma requisição POST para /api/users com nome, email e senha
    Then devo receber status 201
    And usuário criado com sucesso

  Scenario: Listar usuários
    When envio uma requisição GET para /api/users
    Then devo receber status 200
    And uma lista de usuários

  Scenario: Atualizar usuário existente
    Given que estou autenticado
    When envio uma requisição PUT para /api/users/1 com dados atualizados
    Then devo receber status 200
    And usuário atualizado com sucesso

  Scenario: Deletar usuário existente
    Given que estou autenticado
    When envio uma requisição DELETE para /api/users/1
    Then devo receber status 200
    And usuário deletado com sucesso