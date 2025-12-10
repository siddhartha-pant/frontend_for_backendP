import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-prac-drt3.onrender.com/v1/",
});

export default api;
