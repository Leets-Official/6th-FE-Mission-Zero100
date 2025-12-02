import { createBrowserRouter } from "react-router-dom";
import RootPage from "@/pages/RootPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import TodoPage from "@/pages/TodoPage.jsx";
import KakaoRedirectPage from "@/pages/KakaoRedirectPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
    },
    {
        path: "/todo",
        element: <TodoPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },

    // ★★ 카카오가 실제로 보내는 URL과 일치해야 함 ★★
    {
        path: "/oauth/kakao/success",
        element: <KakaoRedirectPage />,
    },
]);
