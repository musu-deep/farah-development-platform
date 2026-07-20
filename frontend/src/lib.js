import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
export const api = axios.create({ baseURL: API_URL, withCredentials: true, timeout: 30000 });

export function apiError(error) {
  const detail = error?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((item) => item.msg).join("، ");
  return "تعذر إتمام العملية. حاول مرة أخرى.";
}

export function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium" }).format(new Date(value));
}
