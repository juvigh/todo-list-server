import 'dotenv/config';

import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./graphql/index.js";

import jwt from "jsonwebtoken";
import { ERROR_MESSAGES } from './errors/messages.js';

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error(ERROR_MESSAGES.SERVER.JWT_SECRET_MISSING);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = req.headers.authorization;

    if (!auth) return { user: null };

    const token = auth.replace("Bearer ", "");

    try {
      const payload = jwt.verify(token, secret) as { userId: string };
      return { user: payload };
    } catch {
      return { user: null };
    }
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server rodando na ${url}`);
});
