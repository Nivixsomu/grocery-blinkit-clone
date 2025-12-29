import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach token if found
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;

export const addToCart = async (productId, quantity = 1) => {
  return API.post("/cart/add", {
    productId,
    quantity,
  });
};

