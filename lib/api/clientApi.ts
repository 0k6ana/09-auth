import { api } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";

/* ================= TYPES ================= */

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface AuthBody {
  email: string;
  password: string;
}

interface UpdateUserBody {
  username?: string;
  avatar?: string;
}

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

/* ================= NOTES ================= */

export const fetchNotes = async (params?: {
  page?: number;
  search?: string;
  tag?: string;
  perPage?: number;
}): Promise<NotesResponse> => {
  const { data } = await api.get("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const { data } = await api.post("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};

/* ================= AUTH ================= */

export const register = async (body: AuthBody): Promise<User> => {
  const { data } = await api.post("/auth/register", body);
  return data;
};

export const login = async (body: AuthBody): Promise<User> => {
  const { data } = await api.post("/auth/login", body);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await api.get("/auth/session");
  return data ?? null;
};

/* ================= USER ================= */

export const getMe = async (): Promise<User> => {
  const { data } = await api.get("/users/me");
  return data;
};

export const updateMe = async (
  body: UpdateUserBody
): Promise<User> => {
  const { data } = await api.patch("/users/me", body);
  return data;
};