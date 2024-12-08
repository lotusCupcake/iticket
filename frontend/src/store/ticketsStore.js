import { create } from "zustand";
import { ticketsApi } from "../api/ticketsApi";

const useTicketsStore = create((set) => ({
  tickets: [],

  fetchTickets: async (status) => {
    try {
      const tickets = await ticketsApi.getTickets(status);
      set({ tickets });
    } catch (error) {
      console.error("Failed to fetch tickets: ", error);
      throw error;
    }
  },
}));

export default useTicketsStore;
