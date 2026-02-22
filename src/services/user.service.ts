import { prisma } from "../lib/prisma.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGES } from "../errors/messages.js";

export const UserService = {
  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error(ERROR_MESSAGES.USER.EMAIL_ALREADY_EXISTS);
    }

    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    return user;
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error(ERROR_MESSAGES.AUTH.USER_NOT_FOUND);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error(ERROR_MESSAGES.AUTH.INVALID_PASSWORD);

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error(ERROR_MESSAGES.SERVER.JWT_SECRET_MISSING);
    }

    const token = jwt.sign({ userId: user.id }, secret, {
      expiresIn: "7d",
    });

    return { token };
  }
};
