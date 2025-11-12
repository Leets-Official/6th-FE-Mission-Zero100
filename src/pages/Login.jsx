import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // UI-only: just navigate to /todo on "login"
    navigate('/todo')
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
            </div>
            <button
              type="submit"
              className="w-28 h-12 bg-slate-700 text-white rounded-md text-lg font-medium flex items-center justify-center"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
