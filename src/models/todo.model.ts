export type TodoId = number;

export type Todo = {
  id: TodoId;
  title: string;
  isDone: boolean;
};

export type Todos = Todo[];
