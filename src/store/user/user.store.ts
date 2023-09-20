import { User } from "../../models";
import { StoreSlice } from "../store.ts";

export type UserSlice = {
  user: User;
  setUserId: (id: string) => void;
};

export const createUserSlice: StoreSlice<UserSlice> = (set) => ({
  user: {
    id: 0,
  },
  setUserId: (id: string) => {
    set(
      (state) => ({ user: { ...state.user, id } }),
      false,
      // @ts-ignore
      "setUserId",
    );
  },
});
