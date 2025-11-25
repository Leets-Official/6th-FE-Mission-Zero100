import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: attach Authorization header if `user` has token
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('user') || localStorage.getItem('loginUser')
    if (raw) {
      const user = JSON.parse(raw)
      const token = user?.accessToken || user?.token || user?.authToken
      if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
      }
    }
  } catch (e) {
    // ignore
  }
  return config
})

// Response interceptor: pass through, could handle global errors here
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // example: if 401, you could clear localStorage or redirect
    return Promise.reject(err)
  }
)

export default api
