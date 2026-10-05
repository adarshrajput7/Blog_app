import axios from 'axios';

// Vite local par DEV ko true rakhta hai, Render/Production par false
const BASE_URL = import.meta.env.DEV 
    ? 'http://localhost:8000' 
    : 'https://blog-app-sjs3.onrender.com';

console.log(`🚀 Connected to Backend: ${BASE_URL}`);

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});