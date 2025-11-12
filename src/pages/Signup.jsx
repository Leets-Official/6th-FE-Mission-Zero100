import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // UI-only: pretend signup succeeded and navigate to login
    navigate('/login')
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

          <div className="flex justify-center mt-2">
            <button type="submit" className="px-5 py-3 bg-slate-700 text-white rounded-lg shadow-md text-base">회원가입</button>
          </div>
        </form>
      </div>
    </div>
  )
}