import { useNavigate } from "react-router-dom";
import Text from "@/components/Text";
import Button from "@/components/Button";

export default function RootPage() {
  const navigate = useNavigate();

  const kakaoLogin = () => {
    window.location.href = "https://blog.leets.land/auth/kakao";



  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
      <Text as="h1" className="text-3xl font-bold mb-10 text-black">
        OO’s TODO
      </Text>

      <div className="flex flex-col gap-4 w-56">

        {/* 일반 로그인 버튼 */}
        <Button
          className="w-full py-3 rounded-full bg-gray-200 text-black text-lg font-bold hover:bg-gray-300 transition"
          onClick={() => navigate("/login")}
        >
          로그인
        </Button>

        {/* 일반 회원가입 버튼 */}
        <Button
          className="w-full py-3 rounded-full bg-gray-200 text-black text-lg font-bold hover:bg-gray-300 transition"
          onClick={() => navigate("/signup")}
        >
          회원가입
        </Button>

        {/*  카카오 로그인 버튼 */}
        <button onClick={kakaoLogin} className="mt-2">
          <img
            src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
            width="222"
            alt="카카오 로그인 버튼"
            className="mx-auto"
          />
        </button>
      </div>
    </div>
  );
}
