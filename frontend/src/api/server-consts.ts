// export const API_BASE_URL = "http://127.0.0.1:8000/api";
// export const API_BASE_URL = "http://192.168.4.52:8000/api";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE_URL:", API_BASE_URL);