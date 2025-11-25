import axios from "axios";

export const api = axios.create({
  baseURL: "https://blog.leets.land",
  withCredentials: true,
  timeout: 5000,
});
