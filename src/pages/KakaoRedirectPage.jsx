import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { kakaoLogin } from "@/api/auth";
import axios from "axios";
import Text from "@/components/Text";

export default function KakaoRedirectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const handledRef = useRef(false); // StrictMode 중복 실행 방지
  const [message, setMessage] = useState("카카오 로그인 처리 중...");

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    // 카카오 인가 코드 추출
    const code = new URLSearchParams(location.search).get("code");

    if (!code) {
      setMessage("카카오 인가 코드가 없습니다.");
      return;
    }

    const process = async () => {
      try {
        // 백엔드에 인가 코드 전달
        const result = await kakaoLogin(code);

        console.log("백엔드 응답:", result);

        // 회원가입 필요
        if (result.code === 401) {
          const { nickname, picture, kakaoId } = result.data;

          const kakaoUser = { nickname, picture, kakaoId };
          localStorage.setItem("kakaoUser", JSON.stringify(kakaoUser));
          // 회원가입 페이지로 이동
          navigate("/signup", { state: { code } });
          return;
        }

        // 정상 로그인
        if (result.code === 200) {
          const { name, email } = result.data;

          // OAuth 로그인 정보 저장
          localStorage.setItem("userName", name);
          localStorage.setItem("userEmail", email);

          // 이미 저장된 사용자 정보 조회
          const loginUser = JSON.parse(localStorage.getItem("loginUser"));

          // 이름 혹은 닉네임 선택
          const nickname = loginUser?.nickname || loginUser?.name || "사용자";

          alert(`${nickname}님 환영합니다!`);

          navigate("/todo");
        }
      } catch (err) {
        console.error("카카오 로그인 오류:", err.response || err);
        alert("카카오 로그인 실패");
        setMessage("카카오 로그인 실패");
      }
    };

    process();
  }, [location.search, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow text-center">
        <Text as="p">{message}</Text>
      </div>
    </div>
  );
}
