// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://archinav-api.vercel.app/api/v1'
  : 'http://localhost:8000/api/v1';

export { API_BASE_URL }; 