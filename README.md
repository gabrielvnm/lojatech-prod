# progweb-UCB

Matéria de extensão - Programação Web da Universidade Católica de Brasília, 2026
branch prod: branch mais atualizada, backend conectado com banco de dados

## Inicialização
Passos para inicialização do projeto.

Clonar o projeto na máquina atual:
```bash
git clone https://github.com/gabrielvnm/progweb-UCB.git
```
O front end usa versão node 16, o back usa versão 22. Para garantir o funcionamento do projeto, usar nvm para trocar de versão ao iniciar cada pasta.

```bash
nvm install 22
nvm install 16
nvm list
```

nvm list para listar as versões instaladas, os outros comandos instalam as versões necessárias. Para inicializar o front e o back, navegue pelo terminal até o root das pastas /techstore e /database antes de rodar os comandos.


### /lojatech

Essa pasta contem o frontend, usando angular 14. É necessário trocar a versão do node para 16.

```bash
nvm use 16
npm install
npm start
ls node_modules

```
ls node_modules verifica a versão do node.

npm start inicia o servidor na pasta /techstore no link http://localhost:4200/

### /database

Essa pasta contém o backend conectado com banco de dados SQLite.

```bash
nvm use 22
npm install
npm run dev
rm -rf node_modules
```

Essa pasta não tem o node_modules no gitignore. Caso ocorram problemas na instalação, use rm -rf node_modules seguido de npm install.

npm run dev inicializa o servidor da pasta server, roda em http://localhost:3000/

route da API de produtos: 
http://localhost:3000/produtos/

Após inicializar o front e back, testar o CRUD do front em http://localhost:4200/

