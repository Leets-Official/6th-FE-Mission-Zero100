import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Text from "@/components/Text";

export default function SignupPage() {
    // 입력값 상태 관리
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // 회원가입 처리
    const handleSignup = async () => {
        // 입력값 누락 시 경고
        if (!name || !email || !password) {
            alert("모든 항목을 입력하세요.");
            return;
        }

        try {
            //   이메일 중복 여부 확인
            const check = await axios.get("http://localhost:3001/users", {
                params: { email },
            });

            if (check.data.length > 0) {
                alert("회원가입 실패.\n이미 존재하는 아이디(이메일)입니다.");
                return;
            }

            //  새로운 사용자 등록
            await axios.post("http://localhost:3001/users", {
                name,
                email,
                password,
            });

            alert(" 회원가입 성공! 로그인 페이지로 이동합니다.");
            navigate("/login"); // 로그인 페이지로 이동
        } catch (error) {
            console.error(error);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="w-[360px] p-6 bg-gray-200 border border-gray-200 rounded-md shadow-sm">
                <Text as="h2" className="text-2xl font-bold mb-6 text-center">
                    회원가입
                </Text>

                {/* 입력 폼 영역 */}
                <div className="space-y-4">
                    {/* 이름 */}
                    <div className="flex items-center space-x-2">
                        <label className="w-20 text-sm font-bold text-gray-800">이름</label>
                        <Input
                            className="flex-1 border border-gray-400 rounded-xl px-2 py-2 text-sm"
                            placeholder="이름 입력"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* 이메일 */}
                    <div className="flex items-center space-x-2">
                        <label className="w-20 text-sm font-bold text-gray-800">아이디</label>
                        <Input
                            className="flex-1 border border-gray-400 rounded-xl px-2 py-2 text-sm"
                            placeholder="아이디 입력 (이메일 형식)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className="flex items-center space-x-2">
                        <label className="w-20 text-sm font-bold text-gray-800">비밀번호</label>
                        <Input
                            className="flex-1 border border-gray-400 rounded-xl px-2 py-2 text-sm"
                            type="password"
                            placeholder="비밀번호 입력"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                {/* 회원가입 버튼 */}
                <Button
                    variant="primary"
                    className="w-40 py-2 text-sm font-medium mt-6 block mx-auto rounded-md"
                    onClick={handleSignup}
                >
                    회원가입
                </Button>
            </div>
        </div>
    );
}
