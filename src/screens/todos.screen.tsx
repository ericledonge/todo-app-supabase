import { FormEvent, useState } from "react";
import { supabase } from "../api/supabase.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../api/query-client.ts";

type TodoId = number;

type Todo = {
  id: TodoId;
  title: string;
  isDone: boolean;
};

const fetchTodosFn = async () => {
  const response = await supabase.from("todo").select("*");
  return response.data;
};

const createTodoFn = async (title: string) =>
  await supabase.from("todo").insert([{ title }]).select().single();

const toggleTodoFn = async (todoId: TodoId) => {
  const response = await supabase
    .from("todo")
    .update({ isDone: true })
    .match({ id: todoId })
    .select("*");
  return response.data;
};

export const TodosScreen = () => {
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodosFn,
  });

  const createTodo = useMutation({
    mutationFn: createTodoFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div className="todo-container">
      <TodoCreate onCreate={createTodo} />

      <TodoList todos={todos} onToggleTodo={() => {}} onDeleteTodo={() => {}} />
    </div>
  );
};

type TodoCreateProps = {
  onCreate: (title: string) => void;
};

const TodoCreate = ({ onCreate }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate.mutate(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button type="submit">Add todo</button>
    </form>
  );
};

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (todoId: TodoId) => void;
  onDeleteTodo: (todoId: TodoId) => void;
};

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) => {
  return (
    <ul>
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
};

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (todoId: TodoId) => void;
  onDeleteTodo: (todoId: TodoId) => void;
};

const TodoItem = ({ todo, onToggleTodo, onDeleteTodo }: TodoItemProps) => {
  return (
    <li>
      <div className="text">
        <input
          type="checkbox"
          value={todo.title}
          onChange={() => onToggleTodo(todo.id)}
          checked={todo.isDone}
          className="checkbox"
        />

        <p className={todo.isDone ? "done" : ""}>{todo.title}</p>
      </div>

      <div>
        {todo.isDone && (
          <button onClick={() => onDeleteTodo(todo.id)} className="button">
            <p className="cross">&#10005;</p>
          </button>
        )}
      </div>
    </li>
  );
};
