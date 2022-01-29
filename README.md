# FinAPI - Financeira

## 📚 Indice
- [Sobre](#-sobre)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como baixar o projeto](#-como-baixar-o-projeto)
- [Desenvolvimento](#-desencolvimento)
- [Rotas da aplicação](#-Rotas-da-aplicação)
- [Docker](#-Container-Docker)

## 📑 Sobre

O projeto **FinAPI** é uma aplicação que realiza a criação, consulta, atualização e deleção (CRUD) de um serviço de contas bancárias. Esse projeto foi deseonvolvido durante o **Bootcamp Ignite** da Rocketseat na trilha de NodeJS.

## 💻 Tecnologias utilizadas

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Docker](https://docs.docker.com/engine/reference/builder/)

## 💾 Como baixar o projeto

```bash
# Clonar o repositório
$ git clone https://github.com/andresgois/FinAPI.git

# Acessar o diretório
$ cd FinAPI

# Instalar as dependências do projeto
$ yarn install

# Iniciar o projeto
$ yarn dev

```
Por padrão a aplicação roda no endereço http://localhost:3333.
## 📐 Desenvolvimento

### 👨🏼‍💻 Requisitos

- [x] Deve ser possível criar uma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível atualizar dados da conta do cliente
- [x] Deve ser possível obter dados da conta do cliente
- [x] Deve ser possível deletar uma conta
- [x] Deve ser possível consultar o saldo da conta

## 📊 Regras de negócio

- [x] Não deve ser possível cadastrar um CPF já existente
- [x] Não deve ser possível fazer depósito em uma conta não existente
- [x] Não deve ser possível buscar extrato em uma conta nao existente
- [x] Não deve ser possível fazer saque em uma conta não existente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [x] Não deve ser possível excluir uma conta não existente


## Rotas da aplicação

Para te ajudar a entender melhor o funcionamento da aplicação como um todo, abaixo você verá uma descrição de cada rota e quais parâmetros recebe.

### POST `/api/v1/users`

A rota recebe `name`, `email` e `password` dentro do corpo da requisição, salva o usuário criado no banco e retorna uma resposta vazia com status `201`.

### POST `/api/v1/sessions`

A rota recebe `email` e `password` no corpo da requisição e retorna os dados do usuário autenticado junto à um token JWT.

<aside>
💡 Essa aplicação não possui refresh token, ou seja, o token criado dura apenas 1 dia e deve ser recriado após o período mencionado.

</aside>

### GET `/api/v1/profile`

A rota recebe um token JWT pelo header da requisição e retorna as informações do usuário autenticado.

### GET `/api/v1/statements/balance`

A rota recebe um token JWT pelo header da requisição e retorna uma lista com todas as operações de depósito e saque do usuário autenticado e também o saldo total numa propriedade `balance`.

### POST `/api/v1/statements/deposit`

A rota recebe um token JWT pelo header e `amount` e `description` no corpo da requisição, registra a operação de depósito do valor e retorna as informações do depósito criado com status `201`.

### POST `/api/v1/statements/withdraw`

A rota recebe um token JWT pelo header e `amount` e `description` no corpo da requisição, registra a operação de saque do valor (caso o usuário possua saldo válido) e retorna as informações do saque criado com status `201`.

### GET `/api/v1/statements/:statement_id`

A rota recebe um token JWT pelo header e o id de uma operação registrada (saque ou depósito) na URL da rota e retorna as informações da operação encontrada.

## Container Docker
- docker run --name fin_api -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres





