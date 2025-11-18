import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Text from "@/components/Text";

export default function LoginPage() {
    // 입력값 상태 관리
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // 로그인 처리
    const handleLogin = async () => {
        // 입력값 누락 확인
        if (!email || !password) {
            alert("아이디와 비밀번호를 입력하세요.");
            return;
        }

        try {
            //  이메일로 사용자 조회
            const response = await axios.get("http://localhost:3001/users", {
                params: { email },
            });

            // 아이디 존재 여부 확인
            if (response.data.length === 0) {
                alert("존재하지 않는 아이디입니다.");
                return;
            }

            const user = response.data[0];

            // 비밀번호 일치 여부 확인
            if (user.password !== password) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }

            // 로그인 성공 시 쿠키에 유저 정보 저장
            document.cookie = `userEmail=${user.email}; path=/; max-age=3600`;
            document.cookie = `userName=${user.name}; path=/; max-age=3600`;

            alert(`로그인 성공! ${user.name}님 환영합니다.`);
            navigate("/todo"); // Todo 페이지로 이동
        } catch (error) {
            console.error(error);
            alert("서버 오류로 로그인 실패");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="w-[360px] p-6 bg-gray-200 border border-gray-200 rounded-md shadow-sm">
                <Text as="h2" className="text-2xl font-bold mb-6 text-center">
                    로그인
                </Text>

                {/* 로그인 폼 영역 */}
                <div className="flex space-x-2 items-start">
                    <div className="flex flex-col space-y-4 flex-grow">
                        {/* 아이디 입력 */}
                        <div className="flex items-center space-x-2">
                            <label className="w-12 text-sm font-bold text-gray-800">
                                아이디
                            </label>
                            <Input
                                className="flex-1 border border-gray-400 rounded-md px-2 py-2 text-sm"
                                placeholder="아이디 입력"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* 비밀번호 입력 */}
                        <div className="flex items-center space-x-2">
                            <label className="w-13 text-sm font-bold text-gray-800">
                                비밀번호
                            </label>
                            <Input
                                className="flex-1 border border-gray-400 rounded-md px-2 py-2 text-sm"
                                type="password"
                                placeholder="비밀번호 입력"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 로그인 버튼 */}
                    <Button
                        variant="primary"
                        className="w-[100px] h-[100px] mt-0"
                        onClick={handleLogin}
                    >
                        로그인
                    </Button>
                </div>

                {/* 회원가입 페이지 이동 */}
                <Text
                    as="button"
                    onClick={() => navigate("/signup")}
                    className="block mx-auto mt-6 text-gray-800 hover:underline text-center"
                >
                    회원가입
                </Text>
            </div>
        </div>
    );
}
