import { Todo, TodoId } from "../models/todo.model.ts";

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (todoId: TodoId) => void;
  onDeleteTodo: (todoId: TodoId) => void;
};

export const TodoItem = ({
  todo,
  onToggleTodo,
  onDeleteTodo,
}: TodoItemProps) => {
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
