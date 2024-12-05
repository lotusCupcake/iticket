import { create } from "zustand";
import { userApi } from "../api/userApi";

const useUserStore = create((set) => ({
  user: null,

  fetchProfile: async () => {
    try {
      const user = await userApi.getProfile();
      set({ user });
    } catch (error) {
      throw new Error("Failed to get profile:", error);
    }
  },

  accounts: [],

  fetchAccounts: async () => {
    try {
      const accounts = await userApi.getAccounts();
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
