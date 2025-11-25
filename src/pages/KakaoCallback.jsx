import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function KakaoCallback() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const code = params.get('code')
    const BASE_URL = import.meta.env.VITE_BASE_URL || ''

    if (!code) {
      alert('인증 코드가 없습니다.')
      navigate('/login')
      return
    }

    const fetchUser = async () => {
      try {
        const url = `${BASE_URL}/auth/kakao/redirect?code=${encodeURIComponent(code)}`
        const res = await axios.get(url)
        // Success (200): save user and navigate
        if (res && res.status === 200) {
          localStorage.setItem('user', JSON.stringify(res.data))
          navigate('/todo')
          return
        }
        // other statuses fallback
        alert('로그인 처리 중 문제가 발생했습니다.')
        navigate('/login')
      } catch (err) {
        if (err && err.response && err.response.status === 401) {
          // 회원가입 필요
          navigate('/signup')
          return
        }
        const msg = (err && err.response && err.response.data && err.response.data.message) || err.message || '알 수 없는 오류'
        alert(msg)
        navigate('/login')
      }
    }

    fetchUser()
  }, [location, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center text-gray-700">카카오 로그인 처리 중입니다...</div>
    </div>
  )
}
