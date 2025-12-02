// src/pages/SignUpPage.jsx
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/authApi";

export default function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromKakao = searchParams.get("from") === "kakao";

  const [form, setForm] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      // 회원가입 후 로그인 페이지로
      navigate("/login");
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
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>

      {fromKakao && (
        <p className="mb-3 text-xs text-gray-600">
          카카오 로그인은 완료되었지만, 우리 서비스에는 아직 계정이 없어
          추가 정보 입력 후 회원가입이 필요합니다.
        </p>
      )}

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

        <div>
          <label className="block mb-1 text-sm">닉네임</label>
          <input
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">
            회원가입에 실패했습니다. 입력값을 다시 확인해 주세요.
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-10 rounded-md bg-green-500 text-white text-sm font-semibold"
        >
          {isPending ? "회원가입 중..." : "회원가입"}
        </button>
      </form>

      <p className="mt-4 text-xs text-gray-600">
        이미 계정이 있나요?{" "}
        <Link to="/login" className="text-blue-500 underline">
          로그인으로 돌아가기
        </Link>
      </p>
    </div>
  );
}
