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

const updateAssignment = async (id, { resolution, userId }) => {
  console.log(userId);
  try {
    const { data } = await axiosInstance.put("/assignments/" + id, {
      resolution,
      userId,
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
