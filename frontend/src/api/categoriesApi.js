import axiosInstance from "./axiosInstance";

const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/categories");
    return data.data;
  } catch (error) {
    throw error;
  }
};

const addCategory = async (name, description) => {
  try {
    const { data } = await axiosInstance.post("/categories", {
      name,
      description,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (id, name, description) => {
  try {
    const { data } = await axiosInstance.put("/categories/" + id, {
      name,
      description,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    const { data } = await axiosInstance.delete("/categories/" + id);
    return data;
  } catch (error) {
    throw error;
  }
};

export const categoriesApi = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
