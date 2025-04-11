import axios, { Axios } from "axios";

const API = axios.create({
  baseURL: "http://192.168.5.36:5000",
  withCredentials: true,
});

const login = async (data) => {
  try {
    const response = await API.post("/login", data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const register = async (data) => {
  try {
    const response = await API.post("/register", data);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const logout = async () => {
  try {
    const response = await API.delete("/logOut");
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getCurrentUser = async () => {
  try {
    const response = await API.get("/Me");
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { login, register, logout, getCurrentUser };
