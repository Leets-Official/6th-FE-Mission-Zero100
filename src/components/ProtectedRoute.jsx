import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// accessToken이 localStorage에 있는지 확인하여
// 로그인이 필요한 페이지를 보호하는 컴포넌트
const ProtectedRoute = () => {
  const token = localStorage.getItem('accessToken');

  // 토큰이 있으면 자식 컴포넌트(Outlet)를 렌더링하고,
  // 없으면 로그인 페이지로 리디렉션합니다.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
