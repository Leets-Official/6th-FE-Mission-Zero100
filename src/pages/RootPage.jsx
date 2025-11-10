import { useNavigate } from "react-router-dom";
import Text from "@/components/Text";
import Button from "@/components/Button";

export default function RootPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
            {/* 제목 */}
            <Text as="h1" className="text-3xl font-bold mb-10 text-black">
                OO’s TODO
            </Text>

            {/* 버튼 영역 */}
            <div className="flex flex-col gap-4 w-48">
                <Button
                    className="w-full py-3 rounded-full bg-gray-200 text-black text-lg font-bold hover:bg-gray-300 transition"
                    onClick={() => navigate("/login")}
                >
                    로그인
                </Button>

                <Button
                    className="w-full py-3 rounded-full bg-gray-200 text-black text-lg font-bold hover:bg-gray-300 transition"
                    onClick={() => navigate("/signup")}
                >
                    회원가입
                </Button>
            </div>
        </div>
    );
}
