import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;


export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // CORS 이슈 해결을 위해 필요할 수 있음
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if(originalRequest._skipErrorHandler){
      return Promise.reject(error);
    }


    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        const { data } = await axios.post('https://api.leets.land/auth/reissue', { 
          refreshToken: refreshToken,
        });

        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;

        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (reissueError) {
        console.error('토큰 재발급 실패:', reissueError);
        localStorage.clear();
        window.location.href = '/login'; 
        return Promise.reject(reissueError);
      }
    }
    return Promise.reject(error);
  }
);