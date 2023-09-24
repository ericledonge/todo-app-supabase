import { TodoFilter } from "../../../../models";

type TodoFiltersProps = {
  todosNotDoneCount: number;
  filter: TodoFilter;
  onSetFilter: (filter: TodoFilter) => void;
};

export const TodoFilters = ({
  todosNotDoneCount,
  filter,
  onSetFilter,
}: TodoFiltersProps) => {
  return (
    <div className="list-actions">
      <p>{todosNotDoneCount} todos left</p>

      <section className="filterContainer">
        <button
          onClick={() => onSetFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button onClick={() => onSetFilter("active")}>Active</button>
        <button onClick={() => onSetFilter("completed")}>Completed</button>
      </section>

      <button>Clear Completed</button>
    </div>
  );
};
