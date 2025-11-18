import { useEffect, useState } from "react";
import Header from "@/components/Header";
import LoginPage from "@/pages/LoginPage";
import TodoPage from "@/pages/TodoPage";

// 쿠키 읽어오는 함수
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

    useEffect(() => {
        // 쿠키에서 로그인 정보 확인
        const userEmail = getCookie("userEmail");
        if (userEmail) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div className="max-w-xl mx-auto p-6">
            <Header />
            {/* 로그인 여부에 따라 페이지 전환 */}
            {isLoggedIn ? <TodoPage /> : <LoginPage />}
        </div>
    );
}
