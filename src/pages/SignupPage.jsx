import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { registerOauth } from "@/api/auth";
import { fetchUserByEmail, signupUser } from "@/api/auth";

export default function SignupPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); // 사용자 입력 id
    const [password, setPassword] = useState("");

    const oauthCode = useMemo(() => location.state?.code, [location.state]);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            alert("모든 항목을 입력하세요.");
            return;
        }

        try {
            // 🔥 OAuth 회원가입 모드
            if (oauthCode) {
                const kakaoPicture = localStorage.getItem("kakaoPicture");
                const kakaoId = localStorage.getItem("kakaoId");

                const nickname = `kakao_${kakaoId}`; // ★ 수정!!

                await registerOauth({
                    email, // 반드시 이메일 형식
                    nickname: `kakao${kakaoId}`,   // ✔ 언더바 제거
                    profilePicture: kakaoPicture,
                    name,
                    kakaoId,
                    birthDate: "2000-01-01", // ✔ 필수

                });

                alert("카카오 연동 회원가입 완료!");
                navigate("/todo", { replace: true });
                return;
            }


            // 🔥 일반 회원가입
            const exists = await fetchUserByEmail(email);
            if (exists.length > 0) {
                alert("이미 존재하는 아이디입니다.");
                return;
            }

            await signupUser({ name, email, password });

            alert("회원가입 성공!");
            navigate("/login");
        } catch (err) {
            console.error("회원가입 오류:", err.response?.data || err);
            alert(err.response?.data?.message || "회원가입 중 오류 발생");
        }
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <div className="bg-white p-10 rounded-lg shadow-md w-[420px]">
              <Text as="h2" className="text-2xl font-bold mb-8 text-center">
                  {oauthCode ? "카카오 연동 회원가입" : "회원가입"}
              </Text>

              {oauthCode && (
                <p className="text-sm text-gray-600 mb-4 text-center">
                    카카오 인증이 완료되었습니다.
                    <br />
                    서비스에서 사용할 아이디/비밀번호를 입력해 주세요.
                </p>
              )}

              <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-center justify-between gap-3">
                      <label className="w-20 text-right font-medium text-gray-700">
                          이름
                      </label>
                      <Input
                        placeholder="이름 입력"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 border-gray-400"
                      />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                      <label className="w-20 text-right font-medium text-gray-700">
                          아이디
                      </label>
                      <Input
                        placeholder="이메일 입력"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 border-gray-400"
                      />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                      <label className="w-20 text-right font-medium text-gray-700">
                          비밀번호
                      </label>
                      <Input
                        type="password"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-1 border-gray-400"
                      />
                  </div>
              </div>

              <div className="flex justify-end mb-6">
                  <Button
                    variant="primary"
                    className="w-full flex item-center justify-center leading-none bg-gray-700 text-white border-none hover:bg-gray-800 transition"
                    onClick={handleSignup}
                  >
                      회원가입
                  </Button>
              </div>

              <p className="text-center text-gray-600 text-sm">
                  이미 계정이 있으신가요?{" "}
                  <Link to="/login" className="text-blue-600 underline">
                      로그인
                  </Link>
              </p>
          </div>
      </div>
    );
}
