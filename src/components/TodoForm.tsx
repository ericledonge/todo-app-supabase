import { FormEvent, useState } from "react";

type TodoFormProps = {
  onCreate: (title: string) => void;
};

export const TodoForm = ({ onCreate }: TodoFormProps) => {
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
