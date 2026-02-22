export const ERROR_MESSAGES = {
  AUTH: {
    NOT_AUTHENTICATED: "Not authenticated",
    INVALID_TOKEN: "Invalid token",
    USER_NOT_FOUND: "User not found",
    INVALID_PASSWORD: "Invalid password",
  },

  USER: {
    EMAIL_ALREADY_EXISTS: "Email already registered",
  },

  TODO: {
    NOT_FOUND: "Todo not found",
    NOT_OWNER: "You do not have permission to access this todo",
  },

  SERVER: {
    JWT_SECRET_MISSING: "JWT_SECRET is not defined",
  },
} as const;
