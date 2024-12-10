import axiosInstance from "./axiosInstance";

const addAssignment = async (userId, ticketId) => {
  try {
    const { data } = await axiosInstance.post("/assignments", {
      userId,
      ticketId,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const updateAssignment = async (id, resolution) => {
  try {
    const { data } = await axiosInstance.put("/assignments/" + id, {
      resolution,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const assignmentsApi = {
  addAssignment,
  updateAssignment,
};
