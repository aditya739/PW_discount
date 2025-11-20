import axios from 'axios'

const API_BASE = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api'

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

export const heroImageAPI = {
  getAll: () => api.get('/hero-images'),
  create: (data) => api.post('/hero-images', data),
  update: (id, data) => api.put(`/hero-images/${id}`, data),
  delete: (id) => api.delete(`/hero-images/${id}`)
}

export const noticeAPI = {
  getAll: () => api.get('/notices'),
  create: (data) => api.post('/notices', data),
  delete: (id) => api.delete(`/notices/${id}`)
}

export const mainDivAPI = {
  getAll: () => api.get('/main-divs'),
  getAdminAll: () => api.get('/main-divs/admin'),
  create: (data) => api.post('/main-divs', data),
  update: (id, data) => api.put(`/main-divs/${id}`, data),
  delete: (id) => api.delete(`/main-divs/${id}`)
}

export const courseCategoryAPI = {
  getAll: () => api.get('/course-categories'),
  create: (data) => api.post('/course-categories', data),
  update: (id, data) => api.put(`/course-categories/${id}`, data),
  delete: (id) => api.delete(`/course-categories/${id}`)
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
