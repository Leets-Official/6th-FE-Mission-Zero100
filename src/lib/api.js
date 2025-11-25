import axios from 'axios';

const API_BASE_URL = 'https://blog.leets.land';
const ACCESS_TOKEN_KEY = 'accessToken';

// 공용 axios 인스턴스
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  withCredentials: true, // 서버가 쿠키로 토큰을 줄 때 대비
});

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    const status = error.response?.status;

    // 액세스 토큰 만료 -> 재발급 시도 (1회만)
    if (status === 401 && !originalConfig?._retry) {
      originalConfig._retry = true;
      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/reissue`, undefined, {
          withCredentials: true,
        });

        const newAccessToken = data?.accessToken || data?.access_token;
        if (newAccessToken) {
          localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
          originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalConfig);
        }
      } catch (reissueError) {
        clearAccessToken();
        window.location.replace('/login');
        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  },
);
