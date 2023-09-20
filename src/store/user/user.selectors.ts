import { useStore } from "../store.ts";

export const useSetUserId = () => useStore((state) => state.setUserId);

export const useGetUserId = () => useStore((state) => state.user.id);
