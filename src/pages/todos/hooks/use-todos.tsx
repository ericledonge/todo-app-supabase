import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTodoService,
  deleteTodoService,
  getAllTodosService,
  toggleTodoService,
} from "../../../services";
import { queryClient } from "../../../providers/query/query-client-provider.tsx";

export const useTodos = () => {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["todos"], queryFn: getAllTodosService });

  const createTodo = useMutation({
    mutationFn: createTodoService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  }).mutate;

  const toggleTodo = useMutation({
    mutationFn: toggleTodoService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    onError: (error) => console.error(error),
  }).mutate;

  const deleteTodo = useMutation({
    mutationFn: deleteTodoService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    onError: (error) => console.error(error),
  }).mutate;

  return {
    todos,
    isLoading,
    isError,
    createTodo,
    toggleTodo,
    deleteTodo,
  };
};
