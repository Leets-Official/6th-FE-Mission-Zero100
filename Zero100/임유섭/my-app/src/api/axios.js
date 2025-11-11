import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
  withCredentials: false, // json-server는 쿠키 세팅 없음
});

// (선택) 요청/응답 로깅
api.interceptors.request.use((config) => {
  // console.log("[REQ]", config.method, config.url, config.data);
  return config;
});
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // console.error("[RES ERR]", err);
    return Promise.reject(err);
  }
);

export default api;