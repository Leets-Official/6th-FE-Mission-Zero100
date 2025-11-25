import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  try {
    const raw = localStorage.getItem('user')
    if (!raw) return <Navigate to="/login" replace />
    return children
  } catch (e) {
    return <Navigate to="/login" replace />
  }
}
