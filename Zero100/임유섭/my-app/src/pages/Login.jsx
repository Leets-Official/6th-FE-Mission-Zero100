import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function Login() {
  const [form, setForm] = useState({ id: "", pw: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // 과제는 UI 라우팅만: 로그인 성공 가정
    navigate("/todo");
  };

  return (
    <div className="container">
      <Header />
      <div className="card">
        <h2 className="title">로그인</h2>
        <form onSubmit={onSubmit} className="form">
          <label className="label">아이디</label>
          <input className="input" name="id" value={form.id} onChange={onChange} placeholder="abcd" />
          <label className="label">비밀번호</label>
          <input className="input" type="password" name="pw" value={form.pw} onChange={onChange} placeholder="•••" />
          <div className="row">
            <button type="submit" className="btn small">로그인</button>
            <span className="flex1" />
            <Link to="/signup" className="link-btn">회원가입</Link>
          </div>
        </form>
      </div>
    </div>
  );
}