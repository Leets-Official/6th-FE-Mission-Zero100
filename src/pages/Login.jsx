import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api'   //경로 확인

export default function Login() {
  const navigate = useNavigate()
  const [id, setId] = useState('')            // 화면의 "아이디" 입력값 (→ 서버의 username과 매핑)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')      // 에러 메시지 표시용

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const username = id.trim()
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력하세요.')
      return
    }

    try {
      // 1) 아이디 존재 여부
      const { data: byId } = await api.get('/users', { params: { username } })
      if (!byId.length) {
        setError('존재하지 않는 아이디입니다.')
        return
      }

      // 2) 비밀번호 일치 여부
      const { data: ok } = await api.get('/users', { params: { username, password } })
      if (!ok.length) {
        setError('비밀번호가 일치하지 않습니다.')
        return
      }

      // 3) 로그인 성공 → 로그인 유지(localStorage) + 페이지 이동
      const user = ok[0]
      // keep legacy key and also set `user` for unified auth checks
      localStorage.setItem('loginUser', JSON.stringify(user))
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/todo')        // 기존 동작 유지
    } catch (err) {
      console.error(err)
      setError('로그인 중 문제가 발생했습니다. 잠시 후 다시 시도하세요.')
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-5">
      <div className="w-full max-w-md">
        {/* Title */}
        <h1 className="text-2xl font-medium mb-8 text-gray-900 text-center">로그인</h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="w-24 text-right">아이디</p>
                <input
                  placeholder="아이디"
                  value={id}
                  onChange={e => setId(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-sm outline-none"
                />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <p className="w-24 text-right">비밀번호</p>
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-sm outline-none"
                />
              </div>
              {/* 에러 메시지 */}
              {error && (
                <p className="mt-2 text-red-600 text-sm">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-28 h-24 bg-slate-700 text-white rounded-md text-lg font-medium flex items-center justify-center"
            >
              로그인
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
         <Link to="/signup" className="underline">회원가입</Link>
        </div>

        {/* Kakao OAuth 버튼 */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            aria-label="카카오로 로그인"
            onClick={() => {
              // redirect to backend which will forward to Kakao auth
              const BASE_URL = import.meta.env.VITE_BASE_URL || (api && api.defaults && api.defaults.baseURL) || ''
              window.location.href = `${BASE_URL}/auth/kakao`
            }}
            className="w-full max-w-[320px] bg-[#FEE500] text-black font-semibold py-3 rounded-full flex items-center justify-center shadow-md"
          >
            {/* Kakao logo (inline SVG) + label */}
            <span className="flex items-center">
              <svg
                aria-hidden="true"
                focusable="false"
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="4" fill="#FEE500" />
                <path d="M6 8.5C6 6 8 4 10.5 4h3c2.5 0 4.5 2 4.5 4.5V12c0 2.5-2 4.5-4.5 4.5h-3L6 20V8.5z" fill="#3C1E1E" opacity="0.95" />
              </svg>
              <span>카카오로 로그인</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
