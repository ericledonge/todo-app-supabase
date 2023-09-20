import { create } from "zustand";
import { SetState, GetState } from "zustand";
import { devtools } from "zustand/middleware";

import { createUserSlice, UserSlice } from "./user";

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>,
) => T;

export type RootStoreType = UserSlice;

export const useStore = create<RootStoreType>()(
  devtools((set, get) => ({
    ...createUserSlice(set, get),
  })),
);
