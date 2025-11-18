import { createBrowserRouter } from "react-router-dom";
import RootPage from "@/pages/RootPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import TodoPage from "@/pages/TodoPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />, // 루트 페이지 (로그인/회원가입 버튼)
    },
    {
        path: "/todo",
        element: <TodoPage />, // Todo 페이지
    },
    {
        path: "/login",
        element: <LoginPage />, // 로그인 페이지
    },
    {
        path: "/signup",
        element: <SignupPage />, // 회원가입 페이지
    },
]);
