import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../api/supabase.ts";

type TodoId = number;

type Todo = {
  id: TodoId;
  title: string;
  isDone: boolean;
};

export const TodosScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllTodos()
      .then((todos) => {
        setTodos(todos);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const getAllTodos = async () => {
    let { data: todos, error } = await supabase.from("todo").select("*");

    return todos;
  };

  const createTodo = async (title: string) => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("todo")
      .insert([{ title }])
      .select()
      .single();

    setIsLoading(false);

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      setTodos((prevTodos) => [...prevTodos, data]);
    }
  };

  const toggleTodo = (todoId: TodoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const deleteTodo = (todoId: TodoId) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(newTodos);
  };

  return (
    <div className="todo-container">
      {isLoading && <div>Loading...</div>}

      <TodoCreate onCreate={createTodo} />

      <TodoList
        todos={todos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
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
    onCreate(title);
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
