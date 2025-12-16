Feature: Login de Usuário
  Scenario: Login com credenciais válidas
    Given que envio email e senha válidos
    When faço a requisição POST para /api/login
    Then devo receber status 200
    And um token JWT válido