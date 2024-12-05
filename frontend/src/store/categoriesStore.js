import { create } from "zustand";
import { categoriesApi } from "../api/categoriesApi";

const useCategoriesStore = create((set) => ({
  categories: [],

  fetchCategories: async () => {
    try {
      const categories = await categoriesApi.getCategories();
      set({ categories });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  },
}));

export default useCategoriesStore;
