# 📝 Todo List API

API de gerenciamento de tarefas com suporte a autenticação de usuários.  
Permite criar, listar, atualizar e deletar tarefas, garantindo que cada ação seja associada ao usuário autenticado.

---

## Pré-requisitos

- Node.js ≥ 18  
- npm ou yarn  
- SQLite (banco de dados local `dev.db`)  
- Variáveis de ambiente configuradas


---

## Tecnologias

- [TypeScript](https://www.typescriptlang.org/)  
- [Node.js](https://nodejs.org/)  
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)  
- [Prisma](https://www.prisma.io/) + SQLite  
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) para hash de senhas  
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) para autenticação  
- [dotenv](https://www.npmjs.com/package/dotenv) para variáveis de ambiente

---

## Endpoints GraphQL

### Queries

- **`todos`** – Retorna todas as tarefas do usuário autenticado

```graphql
query {
  todos {
    id
    title
    completed
    createdAt
  }
}
```

- **`todo`** – Retorna uma tarefa específica do usuário autenticado

```graphql
query {
  todo(id: "ID_DA_TAREFA") {
    id
    title
    completed
    createdAt
  }
}
```

⚠️ Ambas exigem header Authorization com o token JWT.

### Mutations

- **`register(email: String!, password: String!)`** – Cria um novo usuário

```graphql
mutation {
  register(email: "teste@email.com", password: "123456") {
    id
    email
    createdAt
  }
}
```

- **`login(email: String!, password: String!)`** – Realiza o login e retorna seu token

```graphql
mutation {
  login(email: "teste@email.com", password: "123456") {
    token
  }
}
```

- **`createTodo(title: String!)`** – Cria uma nova tarefa do usuário

```graphql
mutation {
  createTodo(title: "Nova tarefa") {
    id
    title
    completed
    createdAt
  }
}
```

- **`updateTodo(id: ID!, completed: Boolean!)`** – Atualiza status da tarefa

```graphql
mutation {
  updateTodo(id: "ID_DA_TAREFA", completed: true) {
    id
    title
    completed
  }
}
```

- **`deleteTodo(id: ID!)`** – Deleta uma tarefa
```graphql
mutation {
  deleteTodo(id: "ID_DA_TAREFA") {
    id
    title
  }
}
```

⚠️ Todas as mutations de tarefas exigem JWT no header Authorization:

---

## Testes

Use o Apollo Studio, Insomnia ou GraphQL Playground.

Fluxo recomendado:

- Registrar usuário (register)

- Login (login) e copiar o token

- Criar tarefas (createTodo)

- Listar tarefas (todos)

- Buscar tarefa específica (todo(id: ...))

- Atualizar (updateTodo) e deletar (deleteTodo)

Sempre envie o token JWT no header Authorization para endpoints protegidos.

## Rodando Localmente

1. Instale as dependências
```
npm install
```
2. Configure .env com DATABASE_URL e JWT_SECRET
  
3. Inicialize o banco (opcional se já existir dev.db):
```
npx prisma migrate dev --name init
```

4. Inicie a API em desenvolvimento:
  ```
npm tsx src/server.ts
```
5. Acesse http://localhost:4000/ para testar no Playground do Apollo Studio.
