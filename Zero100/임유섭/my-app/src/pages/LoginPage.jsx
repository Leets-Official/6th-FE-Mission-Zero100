// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
import KakaoLoginButton from "../components/KakaoLoginButton";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/todos");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1 text-sm">이메일</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">비밀번호</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">
            로그인에 실패했습니다. 이메일/비밀번호를 확인해 주세요.
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-10 rounded-md bg-blue-500 text-white text-sm font-semibold"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>

      {/* 구분선 */}
      <div className="my-4 flex items-center gap-2 text-xs text-gray-500">
        <hr className="flex-1" />
        <span>또는</span>
        <hr className="flex-1" />
      </div>

      {/* 카카오 로그인 버튼 */}
      <KakaoLoginButton />

      <p className="mt-4 text-xs text-gray-600">
        아직 계정이 없나요?{" "}
        <Link to="/signup" className="text-blue-500 underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
