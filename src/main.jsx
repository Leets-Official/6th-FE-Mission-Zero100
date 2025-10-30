import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// 페이지 예시 (원하면 파일로 분리해도 OK)
function Home() { return <h1 className="text-2xl font-bold">Home</h1> }
function About() { return <h1 className="text-2xl">About</h1> }

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,            // 공통 레이아웃
    children: [
      { index: true, element: <Home /> },   // /
      { path: 'about', element: <About /> } // /about
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
