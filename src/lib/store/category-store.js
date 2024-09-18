import { CATEGORIES } from "@/features/categories/categories.data";
import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  currentCategoryId: CATEGORIES[0].id,
  setCurrentCategoryId: (id) => {
    set({ currentCategoryId: id });
  },
}));
