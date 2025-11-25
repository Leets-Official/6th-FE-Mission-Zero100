import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api' // ← axios 인스턴스(baseURL: http://localhost:3001)

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [id, setId] = useState('')             // 화면의 "아이디" → 서버의 username과 매핑
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')        // 에러 메시지

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const username = id.trim()
    if (!name.trim() || !username || !password) {
      setError('이름, 아이디, 비밀번호를 모두 입력하세요.')
      return
    }

    try {
      // 1) 아이디 중복 검사
      const { data: exists } = await api.get('/users', { params: { username } })
      if (exists.length) {
        setError('이미 존재하는 아이디입니다.')
        return
      }

      // 2) 사용자 생성(회원가입)
      await api.post('/users', { name: name.trim(), username, password })

      // 3) 가입 완료 → 로그인 페이지로
      navigate('/login')
    } catch (err) {
      console.error(err)
      setError('회원가입 중 문제가 발생했습니다. 잠시 후 다시 시도하세요.')
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-5">
      <div className="w-full max-w-[420px]">
        <h1 className="text-3xl font-extrabold text-center mb-7">회원가입</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <label className="w-18 text-base">이름</label>
            <input value={name} onChange={e => setName(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-gray-300" />
          </div>

          <div className="flex items-center gap-3">
            <label className="w-18 text-base">아이디</label>
            <input value={id} onChange={e => setId(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-gray-300" />
          </div>

          <div className="flex items-center gap-3">
            <label className="w-18 text-base">비밀번호</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-gray-300" />
          </div>

          {/* 에러 메시지 */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-center mt-2">
            <button type="submit" className="px-5 py-3 bg-slate-700 text-white rounded-lg shadow-md text-base">회원가입</button>
          </div>

          {/* Kakao OAuth 버튼 */}
          <div className="flex justify-center mt-4">
            <button
              type="button"
              aria-label="카카오로 가입 또는 로그인"
              onClick={() => {
                const BASE_URL = import.meta.env.VITE_BASE_URL || (api && api.defaults && api.defaults.baseURL) || ''
                window.location.href = `${BASE_URL}/auth/kakao`
              }}
              className="w-full max-w-[320px] bg-[#FEE500] text-black font-semibold py-3 rounded-full flex items-center justify-center shadow-md"
            >
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
        </form>
      </div>
    </div>
  )
}
