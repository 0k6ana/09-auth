import axios from 'axios';

const base = process.env.NEXT_PUBLIC_API_URL ?? 'https://notehub-api.goit.study';

export const api = axios.create({
  // ensure we point to the API root (include /api) so route paths are consistent
  baseURL: base.endsWith('/') ? `${base}api` : `${base}/api`,
  withCredentials: true,
});
