import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('accessToken');
  const loginUser = localStorage.getItem('loginUser');

  // 토큰이 없더라도 카카오에서 세션 쿠키를 줄 수 있으므로 loginUser가 있으면 통과시킵니다.
  if (!token && !loginUser) {
    return <Navigate to='/login' replace />;
  }

  return children;
}
