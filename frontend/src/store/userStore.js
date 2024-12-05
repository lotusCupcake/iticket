import { create } from "zustand";
import { userApi } from "../api/userApi";

const useUserStore = create((set) => ({
  user: null,

  fetchProfile: async () => {
    try {
      const user = await userApi.getProfile();
      set({ user });
    } catch (error) {
      console.error("Failed to get profile:", error);
    }
  },

  accounts: [],

  fetchAccounts: async () => {
    try {
      const accounts = await userApi.getAccounts();
      set({ accounts });
    } catch (error) {
      console.error("Failed to get accounts:", error);
    }
  },
}));

export default useUserStore;
