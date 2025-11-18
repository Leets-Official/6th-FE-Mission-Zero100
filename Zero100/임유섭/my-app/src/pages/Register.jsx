import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ username: "", password: "", name: "" });
  const [msg, setMsg] = useState(null);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    const res = await register(form);

    if (!res.ok) {
      if (res.code === "USERNAME_TAKEN") setMsg(res.message); // "이미 존재하는 아이디예요."
      else setMsg("회원가입에 실패했어요. 잠시 후 다시 시도해 주세요.");
      return;
    }

    setMsg("회원가입이 완료되었어요. 이제 로그인해 주세요.");
    setForm({ username: "", password: "", name: "" });
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">회원가입</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" placeholder="이름" value={form.name} onChange={onChange} className="border p-2 w-full" />
        <input name="username" placeholder="아이디" value={form.username} onChange={onChange} className="border p-2 w-full" />
        <input name="password" type="password" placeholder="비밀번호" value={form.password} onChange={onChange} className="border p-2 w-full" />
        <button className="bg-black text-white w-full py-2 rounded">가입하기</button>
      </form>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}