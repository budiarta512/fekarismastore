const isProduction = true;

export const STORAGE_URL = isProduction
  ? "https://karismastore-production.up.railway.app/api/v1/"
  : "http://localhost:8000/api/v1/";
export const API_URI = isProduction
  ? "https://karismastore-production.up.railway.app/api/"
  : "http://localhost:8000/api/";
