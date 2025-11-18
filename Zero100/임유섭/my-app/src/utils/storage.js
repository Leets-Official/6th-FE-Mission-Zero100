export const STORAGE_KEY = "auth";

export function saveAuth(auth) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  // 쿠키도 쓰고 싶다면(선택): document.cookie = `token=${auth.token}; path=/; max-age=604800`;
}

export function loadAuth() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEY);
  // document.cookie = "token=; Max-Age=0; path=/";
}