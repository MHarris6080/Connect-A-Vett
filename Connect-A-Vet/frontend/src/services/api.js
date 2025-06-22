import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:5000/api', // backend base URL
});

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  forgotPassword: (email) => API.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => API.post(`/auth/reset-password/${token}`, { password }),
};

export const appointmentAPI = {
  create: (data) => API.post('/appointments', data),
  getAll: () => API.get('/appointments'),
};


export const petAPI = {
  getAll: () => api.get('/pets'),
  create: (pet) => api.post('/pets', pet),
  update: (id, pet) => api.put(`/pets/${id}`, pet),
  delete: (id) => api.delete(`/pets/${id}`)
};


export default API;


