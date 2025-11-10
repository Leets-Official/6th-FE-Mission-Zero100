import { api } from "./api";

const KEY = "loginUser";

export async function signup({ name, username, password }) {
  // 아이디 중복 검사
  const { data: exists } = await api.get("/users", { params: { username } });
  if (exists.length) throw new Error("이미 존재하는 아이디입니다.");

  // 가입
  const { data: user } = await api.post("/users", { name, username, password });

  // (선택) 가입 후 자동 로그인
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export async function login(username, password) {
  // 아이디 존재
  const { data: byId } = await api.get("/users", { params: { username } });
  if (!byId.length) throw new Error("존재하지 않는 아이디입니다.");

  // 비번 일치
  const { data: ok } = await api.get("/users", { params: { username, password } });
  if (!ok.length) throw new Error("비밀번호가 일치하지 않습니다.");

  const user = ok[0];
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function getSession() {
  const raw = localStorage.getItem(KEY);
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}

export function logout() {
  localStorage.removeItem(KEY);
}
