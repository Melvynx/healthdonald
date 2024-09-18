import { create } from "zustand";
import { useUserStore } from "./user-store";

export const useAdminStore = create((set) => ({
  isAdminEnabled: false,
  toggleIsAdminEnabled: () => {
    set((state) => ({ isAdminEnabled: !state.isAdminEnabled }));
  },
}));

export const useIsAdminEnabled = () => {
  const enabled = useAdminStore((state) => state.isAdminEnabled);
  const isUserAdmin = useUserStore((state) => state.isAdmin);

  console.log({ enabled, isUserAdmin });

  return enabled && isUserAdmin;
};
