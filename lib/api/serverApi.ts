import { cookies } from "next/headers";
import { api } from "@/app/api/api";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

async function getCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore.toString();
}

/* ================= NOTES ================= */

export const fetchNotes = async (params?: {
  page?: number;
  search?: string;
  tag?: string;
  perPage?: number;
}): Promise<Note[]> => {

  const cookieHeader = await getCookieHeader();

  const response: AxiosResponse<Note[]> = await api.get("/notes", {
    params,
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

/* ================= USER ================= */

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const response: AxiosResponse<User> = await api.get("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const checkSession = async (): Promise<AxiosResponse> => {
  const cookieHeader = await getCookieHeader();

  return api.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
};