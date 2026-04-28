// frontend/src/api.js
import axios from 'axios';

// For Vite
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const loginAdmin = (credentials) => api.post('/auth/login', credentials);
export const getAdminProfile = () => api.get('/auth/profile');

// Gallery APIs
// Update gallery functions in api.js
export const getGalleryImages = () => api.get('/gallery');
export const getGalleryImageById = (id) => api.get(`/gallery/${id}`);
export const createGalleryImage = (data) => {
  // data is already FormData
  return api.post('/gallery', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateGalleryImage = (id, data) => {
  return api.put(`/gallery/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteGalleryImage = (id) => api.delete(`/gallery/${id}`);
// Announcement APIs
export const getAnnouncements = () => api.get('/announcements');
export const getAnnouncementById = (id) => api.get(`/announcements/${id}`);
export const createAnnouncement = (data) => api.post('/announcements', data);
export const updateAnnouncement = (id, data) => api.put(`/announcements/${id}`, data);
export const deleteAnnouncement = (id) => api.delete(`/announcements/${id}`);

// Notice APIs
export const getNotices = () => api.get('/notices');
export const getNoticeById = (id) => api.get(`/notices/${id}`);
export const createNotice = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'file') {
      formData.append('file', data[key]);
    } else {
      formData.append(key, data[key]);
    }
  });
  return api.post('/notices', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateNotice = (id, data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'file') {
      formData.append('file', data[key]);
    } else {
      formData.append(key, data[key]);
    }
  });
  return api.put(`/notices/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteNotice = (id) => api.delete(`/notices/${id}`);

// Blog APIs
export const getBlogs = () => api.get('/blogs');
export const getBlogById = (id) => api.get(`/blogs/${id}`);
export const createBlog = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'coverImage') {
      formData.append('coverImage', data[key]);
    } else {
      formData.append(key, data[key]);
    }
  });
  return api.post('/blogs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateBlog = (id, data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'coverImage') {
      formData.append('coverImage', data[key]);
    } else {
      formData.append(key, data[key]);
    }
  });
  return api.put(`/blogs/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

// Career APIs
export const getCareers = () => api.get('/careers');
export const getCareerById = (id) => api.get(`/careers/${id}`);
export const createCareer = (data) => api.post('/careers', data);
export const updateCareer = (id, data) => api.put(`/careers/${id}`, data);
export const deleteCareer = (id) => api.delete(`/careers/${id}`);

export default api;