// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    // 로그인 안 되어 있으면 로그인 페이지로 이동
    return <Navigate to="/login" replace />;
  }

  // 로그인 되어있으면 원래 페이지 렌더
  return children;
}
