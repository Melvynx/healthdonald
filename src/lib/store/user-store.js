import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      userName: null,
      isAdmin: false,
      setUserName: (userName) => {
        set({ userName, isAdmin: userName === "admin" });
      },
      logout: () => {
        set({ userName: null, isAdmin: false });
      },
    }),
    {
      name: "user-storage", // name of the item in the storage
    }
  )
);
