import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <Header />
      <div className="home-buttons">
        <button className="btn" onClick={() => navigate("/login")}>로그인</button>
        <button className="btn" onClick={() => navigate("/signup")}>회원가입</button>
      </div>
    </div>
  );
}