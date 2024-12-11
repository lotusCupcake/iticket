import axiosInstance from "./axiosInstance";

const login = async (email, password) => {
  try {
    const { data } = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    localStorage.setItem("token", data.data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

const register = async (name, email, role, password) => {
  try {
    const { data } = await axiosInstance.post("/users/register", {
      name,
      email,
      role,
      password,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const getProfile = async () => {
  try {
    const { data } = await axiosInstance.get("/users/profile");
    return data.data;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (formData) => {
  try {
    const { data } = await axiosInstance.put("/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const signOut = async () => {
  localStorage.removeItem("token");
};

const getAccounts = async (role) => {
  try {
    const params = role ? { role } : {};
    const { data } = await axiosInstance.get("/users/accounts", { params });
    return data.data;
  } catch (error) {
    throw error;
  }
};

const changeStatus = async (id) => {
  try {
    const { data } = await axiosInstance.patch("/users/change-status", {
      id,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const userApi = {
  login,
  getProfile,
  signOut,
  updateProfile,
  register,
  getAccounts,
  changeStatus,
};
