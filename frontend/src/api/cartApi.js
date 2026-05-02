import API from "./axios";

export const addToCart = (data) => API.post("carts/add/", data);