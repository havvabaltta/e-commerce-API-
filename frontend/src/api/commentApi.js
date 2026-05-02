import API from "./axios";

export const getProductComments = (productId) =>
  API.get(`comments/${productId}/product`);