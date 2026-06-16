# progweb-UCB

Matéria de extensão - Programação Web da Universidade Católica de Brasília, 2026. Repositório contendo o projeto para deploy em produção.

## Instruções

Neste repositório se encontra o código fonte do projeto production ready. A plataforma escolhida para o deploy foi o Render. Como o frontend e o backend necessitam de versões diferentes do node, preferi criar dois serviços, um para o front e outro para o back.

O projeto pode ser acessado através de: https://lojatech-app.onrender.com/ 

Essa URL contém o frontend, que manda requisições para outro serviço em https://lojatech-back.onrender.com/

A requisição inicial pode demorar um pouco, na versão grátis do Render a CPU e RAM são limitadas, o que impacta na velocidade. Após alguns minutos sem requisições, tanto o front quanto o back entram num estado de suspensão. Qualquer requisição enviada após o início da suspensão deve aguardar o início tanto do front quanto do back. Caso a lista de produtos não carregue, é sinal de que o serviço de backend ainda não foi carregado completamente, aguarde alguns minutos para tentar novamente.

É possível mandar chamadas de API manualmente para o backend usando curl, por exemplo:

```bash
curl -X POST https://lojatech-back.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@email.com","password":"password"}'
```

Como as rotas do backend são protegidas, é necessário inserir um email e senha válidos que existam no banco de dados para a autenticação. Após a autenticação, é possível acessar as outras rotas.

A lista de produtos também necessita de autenticação para ser acessada pelo front. Por padrão, o CRUD para adicionar e remover produtos só pode ser utilizado por usuários com acesso de admin. Ao criar um novo usuário, o acesso é user, e permite ver a lista de produtos, mas não adicionar, remover ou editar os produtos.

Para utilizar as funcionalidades de CRUD, utilize o acesso de administrador: 

 - user: gabriel@email.com
 - pswd: asdf1234

## Estrutura

No root do projeto estão o arquivo README, um package.json com parâmetros para o deploy, e as pastas contendo o frontend e o backend. O código-fonte do front pode ser acessado na pasta /lojatech, enquanto o back se encontra na pasta /database. O front foi construído usando Angular14. O back usa Express e conecta com um banco de dados SQLite.

## Autor

Projeto criado por Gabriel Martins, matrícula UC24200813.



