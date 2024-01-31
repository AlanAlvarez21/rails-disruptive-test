export const API_URL = 
    process.env.NODE_ENV === 'test'
    ? 'http://localhost:3000/api/v1/currencies'
    : import.meta.env.VITE_API_URL;