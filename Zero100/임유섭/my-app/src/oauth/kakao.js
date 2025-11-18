// src/oauth/kakao.js
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

// 1) 카카오 authorize URL 만들기
export const getKakaoAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: KAKAO_REST_API_KEY,
    redirect_uri: KAKAO_REDIRECT_URI,
    response_type: "code",
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
};

// 2) 인가 코드 → 액세스 토큰
export const getKakaoToken = async (code) => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: KAKAO_REST_API_KEY,
    redirect_uri: KAKAO_REDIRECT_URI,
    code,
  });

  const res = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params,
  });

  if (!res.ok) {
    throw new Error("카카오 토큰 요청 실패");
  }

  return res.json(); // { access_token, refresh_token, ... }
};

// 3) 액세스 토큰 → 카카오 유저 정보
export const getKakaoUserInfo = async (accessToken) => {
  const res = await fetch("https://kapi.kakao.com/v2/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  if (!res.ok) {
    throw new Error("카카오 사용자 정보 요청 실패");
  }

  return res.json(); // { id, kakao_account: { profile, email, ... } }
};
4. Kakao 로그인 버튼 컴포넌트
위치 예시: src/components/KakaoLoginButton.jsx

jsx
코드 복사
// src/components/KakaoLoginButton.jsx
import { getKakaoAuthUrl } from "../oauth/kakao";

export default function KakaoLoginButton() {
  const handleKakaoLogin = () => {
    const authUrl = getKakaoAuthUrl();
    window.location.href = authUrl; // 카카오 로그인 페이지로 리다이렉트
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      className="w-full mt-4 h-10 rounded-md border flex items-center justify-center gap-2"
    >
      {/* 아이콘은 생략 or 나중에 추가 */}
      <span>카카오 계정으로 로그인</span>
    </button>
  );
}