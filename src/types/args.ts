export interface RegisterArgs {
  email: string;
  password: string;
}

export interface LoginArgs {
  email: string;
  password: string;
}

export interface CreateTodoArgs {
  title: string;
}

export interface UpdateTodoArgs {
  id: string;
  completed: boolean;
}

export interface DeleteTodoArgs {
  id: string;
}
