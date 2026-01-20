import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
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

