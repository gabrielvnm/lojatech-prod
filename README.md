# progweb-UCB

Matéria de extensão - Programação Web da Universidade Católica de Brasília, 2026. Repositório contendo o projeto para deploy em produção.

 - Repositório disponível em: https://github.com/gabrielvnm/lojatech-prod

 - Pitch do projeto: https://youtu.be/jvfa4mHd4h4

Este projeto consiste em uma aplicação web fullstack para uma loja de produtos de informática, e inclui funcionalidades para criação e autenticação de usuários, lista de produtos e carrinho. A aplicação implementa um CRUD básico para a lista de produtos. A autenticação dos usuários e a lista de produtos são obtidos por requisições para o backend da aplicação, que se conecta com um banco de dados SQLite. A funcionalidade de carrinho utiliza o localstorage, e não realiza requisições ao backend.

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

## Funcionalidades

Todas as funcionalidades podem ser utilizadas através do frontend da aplicação.

A primeira funcionalidade de autenticação pode ser acessada através do botão de Login no canto superior direito. A criação pode ser acessada ao clicar em **Registre-se** abaixo do formulário de autenticação. A autenticação em si utiliza JWT no front e back, e manda uma requisição HTTP GET ou POST para o backend, que busca ou inclui o usuário na tabela de usuários do banco de dados. Os dados da sessão ficam salvos no localstorage do navegador.

A funcionalidade da lista de produtos só pode ser acessada após a autenticação. Caso o usuário não esteja autenticado, será redirecionado para a página de login. Após a autenticação, a aplicação envia uma requisição GET para o backend para obter a lista de produtos na respectiva tabela do banco de dados. Um usuário com nível de acesso **user** pode apenas adicionar os produtos ao carrinho, que adiciona um item no localstorage.

O carrinho obtém uma lista de produtos do localstorage, que persiste entre sessões. É possível remover ou adicionar mais unidades de um mesmo item clicando nos respectivos botões. Abaixo da lista de itens no carrinho é realizado o cálculo em tempo real do preço total dos itens, conforme a quantidade for modificada. Ao clicar em Comprar ou Limpar Carrinho, a lista do localstorage é esvaziada, e o botão de comprar exibe uma mensagem de sucesso.

Para realizar as operações de CRUD, é necessário estar autenticado como **admin**. Para obter um acesso admin, entre em contato com o mantenedor do repositório.

 - user: gabriel@email.com
 - pswd: asdf1234

O estado de admin faz com que novos botões sejam exibidos na lista de produtos, para Adicionar, Remover ou Editar um produto. Para que haja persistência de dados real, é necessário que o projeto seja executado localmente.

## Estrutura

No root do projeto estão o arquivo README, um package.json com parâmetros para o deploy, e as pastas contendo o frontend e o backend. O código-fonte do front pode ser acessado na pasta /lojatech, enquanto o back se encontra na pasta /database. O front foi construído usando Angular14. O back usa Express e conecta com um banco de dados SQLite.

Para o deploy na plataforma Render, foram alterados algumas rotas no back e no front, bem como os arquivos package.json e angular.json contendo as dependências do projeto. No front, os arquivos environment.ts e environment.prod.ts configuram as URLs e rotas para produção e desenvolvimento. Na plataforma Render, foram criadas algumas variáveis de ambiente para serem usadas pelo projeto, tanto no front quanto no back.

Infelizmente, o serviço gratuito do Render não permite que haja persistência de dados no banco de dados SQLite, quaisquer dados incluídos no banco serão apagados após um período de inatividade. Durante a sessão ativa, porém, os dados serâo gravados. Isso inclui o banco de produtos e de usuários.

## Inicialização

É possível também inicializar o projeto localmente, sem depender da plataforma Render. É necessário ter instaladas as versões 16 e 18 do node.js (para o backend, é possível que a versão 20 também funcione, mas não realizei muitos testes nessa versão para confirmar), bem como ter instalado o NVM e NPM. Para inicializar localmente, primeiro realize o clone do repositório atual:

```bash
git clone https://github.com/gabrielvnm/lojatech-prod
cd lojatech-prod
```

Após clonar o repositório, para iniciar o front:

```bash
cd lojatech
nvm use 16
npm install
npm start
```

Para iniciar o back:

```bash
cd lojatech
nvm use 18
npm install
npm start
```

O projeto ficará disponível em http://localhost:4200/


## Autor

Projeto criado e desenvolvido por Gabriel Martins, matrícula UC24200813.



