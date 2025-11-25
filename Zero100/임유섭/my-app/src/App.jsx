// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TodoPage from "./pages/TodoPage";
import KakaoCallbackPage from "./pages/KakaoCallbackPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* 카카오 콜백 */}
      <Route
        path="/oauth/kakao/success"
        element={<KakaoCallbackPage />}
      />

      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <TodoPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
