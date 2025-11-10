import Input from "@/components/Input";
import Button from "@/components/Button";
import Text from "@/components/Text";

export default function SignupPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            {/* 회원가입 박스 */}
            <div className="w-[360px] p-6 bg-gray-200 border border-gray-200 rounded-md shadow-sm">
                {/* 제목 */}
                <Text as="h2" className="text-2xl font-bold mb-6 text-center">
                    회원가입
                </Text>

                {/* 입력 필드 그룹 */}
                <div className="space-y-4">
                    {/* 이름 입력 */}
                    <div className="flex items-center space-x-2">
                        <label className="w-20 text-sm font-bold text-gray-800 shrink-0 whitespace-nowrap">
                            이름
                        </label>
                        <Input
                            className="flex-1 border border-gray-400 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            placeholder="이름 입력"
                        />
                    </div>

                    {/* 아이디 입력 */}
                    <div className="flex items-center space-x-2">
                        <label className="w-20 text-sm font-bold text-gray-800 shrink-0 whitespace-nowrap">
                            아이디
                        </label>
                        <Input
                            className="flex-1 border border-gray-400 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            placeholder="아이디 입력"
                        />
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className="flex items-center space-x-2">
                        <label className="w-20 text-sm font-bold text-gray-800 shrink-0 whitespace-nowrap">
                            비밀번호
                        </label>
                        <Input
                            className="flex-1 border border-gray-400 rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            type="password"
                            placeholder="비밀번호 입력"
                        />
                    </div>
                </div>

                {/* 회원가입 버튼 */}
                <Button
                    variant="primary"
                    className="w-40 py-2 text-sm font-medium mt-6 block mx-auto rounded-md"
                >
                    회원가입
                </Button>
            </div>
        </div>
    );
}
