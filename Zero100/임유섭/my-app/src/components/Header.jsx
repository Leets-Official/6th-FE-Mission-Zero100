import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { auth, isAuthed, logout } = useAuth();
  return (
    <header className="border-b p-4 flex items-center justify-between">
      <Link to="/" className="font-bold">MyApp</Link>
      <nav className="space-x-3">
        {!isAuthed ? (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
          </>
        ) : (
          <>
            <span>{auth.user.name}님</span>
            <button onClick={logout} className="underline">로그아웃</button>
          </>
        )}
      </nav>
    </header>
  );
}
