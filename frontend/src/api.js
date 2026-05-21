import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const incrementVisitor = () => api.get('/visitors/');
export const getProfile = () => api.get('/profile/');
export const getProjects = () => api.get('/projects/');
export const getProject = (slug) => api.get(`/projects/${slug}/`);
export const getEducation = () => api.get('/education/');
export const getInterests = () => api.get('/interests/');