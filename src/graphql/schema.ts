import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
  }

  type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    register(email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
    createTodo(title: String!): Todo!
    updateTodo(id: ID!, completed: Boolean!): Todo!
    deleteTodo(id: ID!): Todo!
  }
`;
