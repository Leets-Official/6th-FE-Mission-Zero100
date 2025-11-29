import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('accessToken'); // 카카오 로그인
  const loggedInUser = localStorage.getItem('loggedInUser'); // 일반 로그인
  const userId = localStorage.getItem('userId'); // 사용자 ID

  const isAuthenticated = token || loggedInUser || userId;

  console.log('ProtectedRoute 인증 체크:', {
    hasToken: !!token,
    hasLoggedInUser: !!loggedInUser,
    hasUserId: !!userId,
    isAuthenticated: !!isAuthenticated
  });

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;