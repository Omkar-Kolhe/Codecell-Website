import { API_BASE_URL } from "./config";

export function loginWithGoogle() {
  window.location.href = `${API_BASE_URL}/auth/google/login`;
}