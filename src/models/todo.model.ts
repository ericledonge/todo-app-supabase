export type TodoId = number;

export type Todo = {
  id: TodoId;
  userId: number;
  title: string;
  isDone: boolean;
};

export type Todos = Todo[];
