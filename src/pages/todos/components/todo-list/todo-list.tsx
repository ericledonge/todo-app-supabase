import { Todo, TodoId, Todos } from "../../../../models";
import { TodoItem } from "../todo-item";

type TodoListProps = {
  todos: Todos | undefined;
  onToggleTodo: (todo: Todo) => void;
  onDeleteTodo: (todoId: TodoId) => void;
};

export const TodoList = ({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) => {
  return (
    <ul>
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={() => onToggleTodo(todo)}
          onDeleteTodo={() => onDeleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
};
