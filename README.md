# QA-Commerce

### Loja virtual Geek para simulação de testes 

## Clonando e executando em sua máquina

### Pré-requisito:

-Node.js - Você encontra em: https://nodejs.org/en/
-Visual Studio Code ( ou editor de sua prefrência) - você encontra em: https://code.visualstudio.com/download
-Git: você encontra em: https://git-scm.com/downloads

git clone https://github.com/fabioaraujoqa/qa-commerce.git
```
```
cd qa-commerce
```


#### Para instalar as dependencias:
```
npm install 
```

#### Para subir o servidor e o banco:
```
npm start
```
## Estrutura do Projeto

- `public/` → páginas HTML da aplicação
- `config/` → configuração de banco e Swagger
- `middleware/` → middlewares de autenticação
- `scripts/` → inicialização de banco
- `src/` → coleções Postman
- `cypress/e2e/features/` → cenários Gherkin
- `cypress/e2e/step_definitions/` → implementação dos steps
- `cypress/e2e/api.cy.js` → testes de API
- `cypress/support/` → comandos customizados e helpers

▶️ Executando os Testes
##1. Abrir Cypress em modo interativo
```
npx cypress open
```
- Escolha E2E Testing
- Selecione o navegador
- Execute os cenários .feature ou o arquivo api.cy.js

##2. Rodar testes de API diretamente
```
npx cypress run --spec "cypress/e2e/api.cy.js"
```
##3. Rodar todos os cenários Gherkin
```
npx cypress run --spec "cypress/e2e/features/*.feature"
```

📜 Scripts no package.json
Para facilitar a execução, adicione os seguintes scripts:



No console vai aparecer os endereços do site e do banco. 
O site você acessaem: http://localhost:3000/

A documentação funciona em: http://localhost:3000/api-docs/

*Parceria: Fábio Araújo, Bruna Emerich e Tamara Fontanella






