import { useState } from "react";

import { useTodos } from "./hooks";
import { Todo, TodoFilter } from "../../models";
import { TodoFilters, TodoForm, TodoList } from "./components";

export const TodosPage = () => {
  const { todos, isLoading, isError, createTodo, toggleTodo, deleteTodo } =
    useTodos();

  const [filter, setFilter] = useState<TodoFilter>("all");

  const todosFiltered = todos?.filter((todo: Todo) => {
    switch (filter) {
      case "active":
        return !todo.isDone;
      case "completed":
        return todo.isDone;
      default:
        return true;
    }
  });

  const todosNotDoneCount =
    todos?.filter((todo: Todo) => !todo.isDone).length || 0;

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error...</p>;

  return (
    <div className="todo-container">
      <TodoForm onCreate={createTodo} />

      <TodoList
        todos={todosFiltered}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />

      <TodoFilters
        todosNotDoneCount={todosNotDoneCount}
        filter={filter}
        onSetFilter={setFilter}
      />
    </div>
  );
};
