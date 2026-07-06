import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';
const BASE_URL = `${API_BASE_URL}/students`;

// This keeps your pagination fix active so you can see up to 100 students at once!
export const getAllStudents = () => axios.get(`${BASE_URL}?page=0&size=100`);

export const addStudent = (student) => axios.post(BASE_URL, student);

export const deleteStudent = (id) => axios.delete(`${BASE_URL}/${id}`);

export const updateStudent = (id, student) => axios.put(`${BASE_URL}/${id}`, student);

export const searchStudents = (name) => axios.get(`${BASE_URL}/search?name=${name}`);