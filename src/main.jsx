import { StrictMode } from 'react'
import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// simple inline example components were here before; replace by importing pages
// Use the existing Todo app (export default) located at src/page.jsx
import TodoApp from './page.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

function Home() {
  // redirect to /todo if already logged in
  const navigate = useNavigate()
  useEffect(() => {
    try {
      const raw = localStorage.getItem('loginUser')
      if (raw) navigate('/todo')
    } catch (e) {
      // ignore
    }
  }, [navigate])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-3 w-full max-w-[300px] mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-5">Suseong TODO</h1>
        <a href="/login" className="block px-4 py-4 bg-slate-700 text-white rounded-full text-center text-base font-medium w-full max-w-[200px] mx-auto">로그인</a>
        <a href="/signup" className="block px-4 py-4 bg-slate-700 text-white rounded-full text-center text-base font-medium w-full max-w-[200px] mx-auto">회원가입</a>
      </div>
    </div>
  )
}

function About() { return <h1 className="text-2xl">About</h1> }

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,            // 공통 레이아웃
    children: [
      { index: true, element: <Home /> },   // /
      { path: 'about', element: <About /> }, // /about
  { path: 'todo', element: <TodoApp /> }, // /todo (use existing Todo app)
      { path: 'login', element: <Login /> }, // /login
      { path: 'signup', element: <Signup /> }, // /signup
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
