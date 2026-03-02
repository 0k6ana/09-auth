import axios from "axios";
import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

function createServerApi() {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  return axios.create({
    baseURL,
    headers: {
      Cookie: cookieHeader,
    },
  });
}

/* ================= NOTES ================= */

export const fetchNotes = async (params?: {
  page?: number;
  search?: string;
  tag?: string;
  perPage?: number;
}) => {
  const api = createServerApi();
  const { data } = await api.get("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const api = createServerApi();
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

/* ================= USER ================= */

export const getMe = async () => {
  const api = createServerApi();
  const { data } = await api.get("/users/me");
  return data;
};

export const checkSession = async () => {
  const api = createServerApi();
  const { data } = await api.get("/auth/session");
  return data;
};