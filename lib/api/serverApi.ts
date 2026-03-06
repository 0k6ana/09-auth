import { cookies } from "next/headers";
import { api } from "@/app/api/api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

async function createServerApi() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  api.defaults.headers.Cookie = cookieHeader;

  return api;
}

/* ================= NOTES ================= */

export const fetchNotes = async (params?: {
  page?: number;
  search?: string;
  tag?: string;
  perPage?: number;
}): Promise<Note[]> => {
  const serverApi = await createServerApi();
  const response: AxiosResponse<Note[]> = await serverApi.get("/notes", { params });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const serverApi = await createServerApi();
  const response: AxiosResponse<Note> = await serverApi.get(`/notes/${id}`);

  return response.data;
};

/* ================= USER ================= */

export const getMe = async (): Promise<User> => {
  const serverApi = await createServerApi();
  const response: AxiosResponse<User> = await serverApi.get("/users/me");

  return response.data;
};

export const checkSession = async (): Promise<AxiosResponse> => {
  const serverApi = await createServerApi();
  return serverApi.get("/auth/session");
};