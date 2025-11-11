import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function Signup() {
  const [form, setForm] = useState({ name: "", id: "", pw: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // 실제 가입 로직 대신: 가입 후 로그인으로
    navigate("/login");
  };

  return (
    <div className="container">
      <Header />
      <div className="card">
        <h2 className="title">회원가입</h2>
        <form onSubmit={onSubmit} className="form">
          <label className="label">이름</label>
          <input className="input" name="name" value={form.name} onChange={onChange} placeholder="김철수" />
          <label className="label">아이디</label>
          <input className="input" name="id" value={form.id} onChange={onChange} placeholder="chulsu" />
          <label className="label">비밀번호</label>
          <input className="input" type="password" name="pw" value={form.pw} onChange={onChange} placeholder="•••" />
          <button type="submit" className="btn">회원가입</button>
        </form>
      </div>
    </div>
  );
}