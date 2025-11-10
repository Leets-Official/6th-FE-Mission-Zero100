import { useNavigate } from "react-router-dom";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Text from "@/components/Text";


export default function LoginPage() {
    const navigate = useNavigate(); // 페이지 이동을 위한 React Router Hook

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            {/* 로그인 박스 */}
            <div className="w-[360px] p-6 bg-gray-200 border border-gray-200 rounded-md shadow-sm">
                {/* 페이지 제목 */}
                <Text as="h2" className="text-2xl font-bold mb-6 text-center">
                    로그인
                </Text>

                <div className="flex space-x-2 items-start">
                    <div className="flex flex-col space-y-4 flex-grow">

                        {/* 아이디 입력 */}
                        <div className="flex items-center space-x-2">
                            <label className="w-12 text-sm font-bold text-gray-800 shrink-0 whitespace-nowrap">
                                아이디
                            </label>
                            <Input
                                className="flex-1 border border-gray-400 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                placeholder="아이디 입력"
                            />
                        </div>

                        {/* 비밀번호 입력 */}
                        <div className="flex items-center space-x-2">
                            <label className="w-12 text-sm font-bold text-gray-800 shrink-0 whitespace-nowrap">
                                비밀번호
                            </label>
                            <Input
                                className="flex-1 border border-gray-400 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                                type="password"
                                placeholder="비밀번호 입력"
                            />
                        </div>
                    </div>

                    {/*  로그인 버튼  */}
                    <Button
                        variant="primary"
                        className="w-[100px] h-[100px] mt-0"
                    >
                        로그인
                    </Button>
                </div>

                {/*  회원가입 이동 */}
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
