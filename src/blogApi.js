import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// Axios interceptor — automatically attaches token to every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const registerUser = (data) =>
  axios.post(`${BASE_URL}/auth/register`, data);

export const loginUser = (data) =>
  axios.post(`${BASE_URL}/auth/login`, data);

// Post endpoints
export const getAllPosts = () =>
  axios.get(`${BASE_URL}/posts`);

export const getPostById = (id) =>
  axios.get(`${BASE_URL}/posts/${id}`);

export const createPost = (post) =>
  axios.post(`${BASE_URL}/posts`, post);

export const updatePost = (id, post) =>
  axios.put(`${BASE_URL}/posts/${id}`, post);

export const deletePost = (id) =>
  axios.delete(`${BASE_URL}/posts/${id}`);

export const getPostsByUser = (username) =>
  axios.get(`${BASE_URL}/posts/user/${username}`);