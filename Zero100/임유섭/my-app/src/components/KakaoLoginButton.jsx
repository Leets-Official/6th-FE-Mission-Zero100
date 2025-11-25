// src/components/KakaoLoginButton.jsx
import { getKakaoLoginUrl } from "../api/authApi";

export default function KakaoLoginButton() {
  const handleClick = () => {
    const url = getKakaoLoginUrl();
    // 과제 설명에 있는 window.location.ref 는 오타로 보고 href 사용
    window.location.href = url;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full mt-4 h-10 rounded-md border flex items-center justify-center gap-2"
    >
      <span>카카오 계정으로 로그인</span>
    </button>
  );
}
