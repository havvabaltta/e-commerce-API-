
import api from "./axios";

export const loginUser = (data) => {
  return api.post("users/login/", data);
};

export const registerUser = (data) => {
  return api.post("users/register/", data);
};