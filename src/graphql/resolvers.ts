import { ERROR_MESSAGES } from "../errors/messages.js";
import { TodoService, UserService } from "../services/index.js";
import { CreateTodoArgs, DeleteTodoArgs, LoginArgs, RegisterArgs, UpdateTodoArgs } from "../types/args.js";
import { GraphQLContext } from "../types/context.js";

export const resolvers = {
  Query: {
    todos: (_: unknown, __: unknown, context: GraphQLContext) => {
      if (!context.user) throw new Error(ERROR_MESSAGES.AUTH.NOT_AUTHENTICATED);
      return TodoService.getAll(context.user.userId);
    },
    todo: (_: unknown, args: { id: string }, context: GraphQLContext) => {
      if (!context.user) throw new Error(ERROR_MESSAGES.AUTH.NOT_AUTHENTICATED);
      return TodoService.getById(args.id, context.user.userId);
    },
  },

  Mutation: {
    register: (_: unknown, args: RegisterArgs) =>
      UserService.register(args.email, args.password),

    login: (_: unknown, args: LoginArgs) =>
      UserService.login(args.email, args.password),

    createTodo: (_: unknown, args: CreateTodoArgs, context: GraphQLContext) => {
      if (!context.user) throw new Error(ERROR_MESSAGES.AUTH.NOT_AUTHENTICATED);
      return TodoService.create(args.title, context.user.userId);
    },

    deleteTodo: (_: unknown, args: DeleteTodoArgs, context: GraphQLContext) => {
      if (!context.user) throw new Error(ERROR_MESSAGES.AUTH.NOT_AUTHENTICATED);
      return TodoService.delete(args.id, context.user.userId);
    },

    updateTodo: (_: unknown, args: UpdateTodoArgs, context: GraphQLContext) => {
      if (!context.user) throw new Error(ERROR_MESSAGES.AUTH.NOT_AUTHENTICATED);
      return TodoService.update(args.id, args.completed, context.user.userId);
    }
  },
};