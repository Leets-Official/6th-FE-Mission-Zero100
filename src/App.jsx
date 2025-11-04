// src/App.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'

// App now acts as the layout component for router children.
// It must render an <Outlet/> so child routes (/, /login, /signup, /todo) appear.
export default function App() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

