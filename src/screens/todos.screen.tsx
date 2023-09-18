import { TodosUseCase } from "../use-cases/todos.use-case.tsx";
import { TodoForm } from "../components/TodoForm.tsx";
import { TodoList } from "../components/TodoList.tsx";

export const TodosScreen = () => {
  const { todos, isLoading, isError, createTodo, toggleTodo, deleteTodo } =
    TodosUseCase();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error...</p>;

  return (
    <div className="todo-container">
      <TodoForm onCreate={createTodo} />

      <TodoList
        todos={todos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
    </div>
  );
};
