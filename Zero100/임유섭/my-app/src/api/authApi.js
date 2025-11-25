// src/api/authApi.js
import apiClient, { BASE_URL } from "./client";

// 🔸 카카오 로그인 버튼에서 사용할 URL (백엔드 → 카카오로 다시 리다이렉트)
export const getKakaoLoginUrl = () => {
  return `${BASE_URL}/auth/kakao`;
  // Swagger 보고 /auth/kakao 경로가 다르면 여기만 바꿔 주면 됨
};

// 🔸 콜백 페이지에서 호출: /auth/kakao/redirect?code=...
export const kakaoRedirect = async (code) => {
  const res = await apiClient.get("/auth/kakao/redirect", {
    params: { code },
  });

  // 실제 응답 구조는 Swagger에서 확인해서 맞춰야 하지만,
  // 기본 형태를 이런 식으로 가정해 둔 거야.
  const { accessToken, user } = res.data;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  return user;
};

// 🔸 일반 로그인
export const login = async ({ email, password }) => {
  const res = await apiClient.post("/auth/login", { email, password });
  // 실제 경로와 응답 구조를 Swagger에서 확인해서 맞춰줘야 함
  const { accessToken, user } = res.data;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  return user;
};

// 🔸 회원가입
export const signUp = async ({ email, password, nickname }) => {
  const res = await apiClient.post("/auth/signup", {
    email,
    password,
    nickname,
  });

  // 필요하면 이쪽에서도 토큰/유저 저장해 줄 수 있음
  return res.data;
};

// 🔸 로그아웃 (선택)
export const logout = async () => {
  try {
    await apiClient.post("/auth/logout"); // 없으면 에러 나도 catch에서 무시
  } catch (e) {
    // ignore
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }
};
