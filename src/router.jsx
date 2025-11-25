import { createBrowserRouter } from "react-router-dom";

import Root from './pages/Root';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TodoPage from './pages/TodoPage';
import KakaoRedirect from './pages/KakaoRedirect';

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
        path:'/todo',
        element:<TodoPage />
    },
    {
        path: '/oauth/kakao/success',
        element: <KakaoRedirect />,
    },
]);

export default router;