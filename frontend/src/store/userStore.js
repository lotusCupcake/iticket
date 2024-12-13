import { create } from "zustand";
import { userApi } from "../api/userApi";

const useUserStore = create((set) => ({
  user: null,

  resetUser: () => {
    set({ user: null });
  },

  setUser: (userData) => {
    set({ user: userData });
  },

  fetchProfile: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ user: null });
      return null;
    }

    try {
      const user = await userApi.getProfile();
      set({ user });
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null });
      throw new Error("Failed to get profile:", error);
    }
  },

  accounts: [],

  fetchAccounts: async (role) => {
    try {
      const accounts = await userApi.getAccounts(role);
      set({ accounts });
    } catch (error) {
      throw new Error("Failed to get accounts:", error);
    }
  },

  changeStatus: async (id) => {
    try {
      const response = await userApi.changeStatus(id);
      return response;
    } catch (error) {
      throw new Error("Failed to change status:", error);
    }
  },
}));

export default useUserStore;
