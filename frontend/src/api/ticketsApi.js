import axiosInstance from "./axiosInstance";

const getTickets = async (status) => {
  try {
    const params = {};
    if (status) {
      params.status = status;
    }

    const { data } = await axiosInstance.get("/tickets", { params });

    return data.data;
  } catch (error) {
    throw error;
  }
};

const addTicket = async (formData) => {
  try {
    const { data } = await axiosInstance.post("/tickets", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const updateTicket = async (id, formData) => {
  try {
    const { data } = await axiosInstance.put("/tickets/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteTicket = async (id) => {
  try {
    const { data } = await axiosInstance.delete("/tickets/" + id);
    return data;
  } catch (error) {
    throw error;
  }
};

export const ticketsApi = {
  getTickets,
  addTicket,
  updateTicket,
  deleteTicket,
};
