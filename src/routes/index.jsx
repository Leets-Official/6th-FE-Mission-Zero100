import { createBrowserRouter } from "react-router-dom";

import Root from '../pages/Root';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import TodoPage from '../pages/TodoPage';
import KakaoRedirect from '../pages/KakaoRedirect';
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element:< Root />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/signup',
        element: <SignupPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/todo',
                element: <TodoPage />
            },
        ]
    },
    {
        path: '/oauth/kakao/success',
        element: <KakaoRedirect />,
    },
]);

export default router;