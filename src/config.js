// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://archinav-api.vercel.app/api'
  : 'http://localhost:8000/api';

export { API_BASE_URL }; 