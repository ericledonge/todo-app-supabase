import { apiClient } from "../api/api-client.ts";
import { Todo, TodoId, Todos } from "../models";
import { useStore } from "../store";

export const getAllTodosService = async (): Promise<Todos> => {
  const userId = useStore.getState().user.id;

  const { data, error } = await apiClient
    .from("todo")
    .select("*")
    .eq("user_id", userId)
    .order("created_at");

  if (error) {
    throw error;
  }

  return data?.map((todo) => ({
    id: todo.id,
    userId: todo.user_id,
    title: todo.title,
    isDone: todo.is_done,
  }));
};

export const createTodoService = async (title: string) => {
  const userId = useStore.getState().user.id;

  return await apiClient
    .from("todo")
    .insert([{ title, user_id: userId }])
    .select()
    .single();
};

export const toggleTodoService = async (todo: Todo) => {
  const userId = useStore.getState().user.id;

  return await apiClient
    .from("todo")
    .update({ is_done: !todo.isDone })
    .eq("id", todo.id)
    .eq("user_id", userId);
};

export const deleteTodoService = async (todoId: TodoId) => {
  const userId = useStore.getState().user.id;

  return await apiClient
    .from("todo")
    .delete()
    .eq("id", todoId)
    .eq("user_id", userId);
};
