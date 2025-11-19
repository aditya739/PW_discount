import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const couponAPI = {
  getAll: () => api.get('/coupons'),
  validate: (code) => api.post('/coupons/validate', { code }),
  create: (data) => api.post('/coupons', data),
  update: (id, data) => api.put(`/coupons/${id}`, data),
  delete: (id) => api.delete(`/coupons/${id}`)
}

export const bannerAPI = {
  getAll: () => api.get('/banners'),
  create: (data) => api.post('/banners', data),
  update: (id, data) => api.put(`/banners/${id}`, data),
  delete: (id) => api.delete(`/banners/${id}`)
}

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  verify: () => api.post('/auth/verify')
}

export const analyticsAPI = {
  track: (data) => api.post('/analytics/track', data),
  getPerformance: (couponId) => api.get(`/analytics/performance/${couponId}`),
  getAll: () => api.get('/analytics')
}

export default api
