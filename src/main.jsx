import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// simple inline example components were here before; replace by importing pages
// Use the existing Todo app (export default) located at src/page.jsx
import TodoApp from './page.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

function Home() {
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh',background:'#f5f5f5'}}>
      <div style={{display:'flex',flexDirection:'column',gap:12,width:'100%',maxWidth:300,margin:'0 auto'}}>
        <h1 style={{fontSize:36,fontWeight:700,textAlign:'center',marginBottom:20}}>Suseong TODO</h1>
        <a href="/login" style={{
          padding:'16px',
          background:'#4B5563',
          borderRadius:9999,
          textDecoration:'none',
          color:'#fff',
          textAlign:'center',
          fontSize:'16px',
          fontWeight:500,
          width:'100%',
          maxWidth:200,
          margin:'0 auto'
        }}>로그인</a>
        <a href="/signup" style={{
          padding:'16px',
          background:'#4B5563',
          borderRadius:9999,
          textDecoration:'none',
          color:'#fff',
          textAlign:'center',
          fontSize:'16px',
          fontWeight:500,
          width:'100%',
          maxWidth:200,
          margin:'0 auto'
        }}>회원가입</a>
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
