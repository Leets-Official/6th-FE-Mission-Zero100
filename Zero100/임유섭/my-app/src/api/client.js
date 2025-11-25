// src/api/client.js
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 백엔드가 쿠키를 쓴다면 필요
});

// 요청 인터셉터: accessToken 있으면 Authorization 헤더에 자동 첨부
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터: 401 나오면 토큰 삭제 (로그아웃 상태로 정리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      // 여기에서 바로 window.location.href = "/login" 해도 되고,
      // 화면 쪽에서 에러를 받아서 처리해도 됨.
    }

    return Promise.reject(error);
  }
);

export default apiClient;
