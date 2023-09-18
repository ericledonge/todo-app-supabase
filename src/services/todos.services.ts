import { apiClient } from "../api/api-client.ts";
import { Todo, TodoId, Todos } from "../models/todo.model.ts";

export const getAllTodosService = async (): Promise<Todos> => {
  const { data, error } = await apiClient
    .from("todo")
    .select("*")
    .order("created_at");

  if (error) {
    throw error;
  }

  return data?.map((todo) => ({
    id: todo.id,
    title: todo.title,
    isDone: todo.is_done,
  }));
};

export const createTodoService = async (title: string) =>
  await apiClient.from("todo").insert([{ title }]).select().single();

export const toggleTodoService = async (todo: Todo) =>
  await apiClient
    .from("todo")
    .update({ is_done: !todo.isDone })
    .eq("id", todo.id);

export const deleteTodoService = async (todoId: TodoId) =>
  await apiClient.from("todo").delete().eq("id", todoId);
