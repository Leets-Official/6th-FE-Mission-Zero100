import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Text from "@/components/Text";

export default function KakaoRedirectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const handledRef = useRef(false);
  const [message, setMessage] = useState("카카오 로그인 처리 중...");

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const code = new URLSearchParams(location.search).get("code");

    if (!code) {
      setMessage("카카오 인가 코드가 없습니다.");
      return;
    }

    const process = async () => {
      try {
        const res = await axios.get(
          `https://blog.leets.land/auth/kakao/redirect`,
          {
            params: { code },
            withCredentials: true,
          }
        );

        const result = res.data;
        console.log("백엔드 응답:", result);

        // 🔥 회원가입 필요 (401일 때)
        if (result.code === 401) {
          const { nickname, picture, kakaoId } = result.data;

          localStorage.setItem("kakaoNickname", nickname);
          localStorage.setItem("kakaoPicture", picture);
          localStorage.setItem("kakaoId", kakaoId);

          navigate("/signup", { state: { code } });
          return;
        }

        // 🔥 정상 로그인
        if (result.code === 200) {
          const { name, email } = result.data;

          localStorage.setItem("userName", name);
          localStorage.setItem("userEmail", email);

          alert(`${name}님 환영합니다!`);
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
