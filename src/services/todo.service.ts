import { prisma } from "../lib/prisma.js"

export const TodoService = {
  getById: (id: string, userId: string) => {
    return prisma.todo.findFirst({
      where: { id, userId },
    });
  },

  getAll: (userId: string) => {
    return prisma.todo.findMany({
      where: { userId },
    });
  },


  create: (title: string, userId: string) => {
    return prisma.todo.create({
      data: {
        title,
        userId,
      },
    });
  },

  update: (id: string, completed: boolean, userId: string) => {
    return prisma.todo.update({
      where: { id, userId },
      data: { completed },
    });
  },

  delete: (id: string, userId: string) => {
    return prisma.todo.delete({
      where: { id, userId },
    });
  },
};
