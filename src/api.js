import axios from "axios";

// json-server 주소(3001)와 반드시 일치!
const api = axios.create({
  baseURL: "http://localhost:3001"
});

export { api };
export default api;