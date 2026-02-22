export interface AuthUser {
  userId: string;
}

export interface GraphQLContext {
  user: AuthUser | null;
}
