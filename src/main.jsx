import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import KakaoCallback from './pages/KakaoCallback.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import './index.css';

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <ErrorPage /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/auth/kakao/redirect', element: <KakaoCallback /> },
  { path: '/oauth/kakao/success', element: <KakaoCallback /> },
  { path: '/success', element: <KakaoCallback /> }, // 백엔드에서 /success 로 리다이렉트될 수도 있음
  {
    path: '/todo',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
