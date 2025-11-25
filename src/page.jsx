import { useState, useEffect } from 'react'
import api from './apiClient'
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import CategoryFilter from './components/CategoryFilter'
import TodoList from './components/TodoList'

// ID 시퀀스 (초기값은 1, 로컬스토리지에서 읽어서 갱신될 수 있음)
let nextId = 1

export default function Home() {
  const [filter, setFilter] = useState('All')
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch todos from API, fall back to localStorage if API unavailable
  useEffect(() => {
    let mounted = true
    async function load() {
      setIsLoading(true)
      try {
        const res = await api.get('/tasks')
        const list = Array.isArray(res.data) ? res.data : []
        if (mounted) {
          setTodos(list)
          localStorage.setItem('tasks', JSON.stringify(list))
        }
      } catch (e) {
        try {
          const raw = localStorage.getItem('tasks')
          const parsed = raw ? JSON.parse(raw) : []
          if (mounted) setTodos(parsed)
        } catch (e2) {
          if (mounted) setTodos([])
        }
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  // actions
  const add = async (title) => {
    try {
      const payload = { title, completed: false }
      const res = await api.post('/tasks', payload)
      const created = res.data
      const updated = [created, ...todos]
      setTodos(updated)
      try { localStorage.setItem('tasks', JSON.stringify(updated)) } catch (e) {}
    } catch (e) {
      // fallback: persist locally
      try {
        const raw = localStorage.getItem('tasks')
        const parsed = raw ? JSON.parse(raw) : []
        const newTodo = { id: nextId++, title, completed: false }
        const updated = [newTodo, ...parsed]
        localStorage.setItem('tasks', JSON.stringify(updated))
        setTodos(updated)
      } catch (err) {}
    }
  }

  const toggle = async (id) => {
    const found = todos.find((t) => t.id === id)
    if (!found) return
    try {
      const res = await api.patch(`/tasks/${id}`, { completed: !found.completed })
      const updated = todos.map(t => t.id === id ? res.data : t)
      setTodos(updated)
      try { localStorage.setItem('tasks', JSON.stringify(updated)) } catch (e) {}
    } catch (e) {
      // fallback: update localStorage
      try {
        const raw = localStorage.getItem('tasks')
        const parsed = raw ? JSON.parse(raw) : []
        const updated = parsed.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        localStorage.setItem('tasks', JSON.stringify(updated))
        setTodos(updated)
      } catch (err) {}
    }
  }

  const del = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      const updated = todos.filter(t => t.id !== id)
      setTodos(updated)
      try { localStorage.setItem('tasks', JSON.stringify(updated)) } catch (e) {}
    } catch (e) {
      try {
        const raw = localStorage.getItem('tasks')
        const parsed = raw ? JSON.parse(raw) : []
        const updated = parsed.filter(t => t.id !== id)
        localStorage.setItem('tasks', JSON.stringify(updated))
        setTodos(updated)
      } catch (err) {}
    }
  }

  const edit = async (id, title) => {
    try {
      const res = await api.patch(`/tasks/${id}`, { title })
      const updated = todos.map(t => t.id === id ? res.data : t)
      setTodos(updated)
      try { localStorage.setItem('tasks', JSON.stringify(updated)) } catch (e) {}
    } catch (e) {
      try {
        const raw = localStorage.getItem('tasks')
        const parsed = raw ? JSON.parse(raw) : []
        const updated = parsed.map(t => t.id === id ? { ...t, title } : t)
        localStorage.setItem('tasks', JSON.stringify(updated))
        setTodos(updated)
      } catch (err) {}
    }
  }

  // filter
  const filtered = todos.filter(t =>
    filter === 'Active' ? !t.completed
      : filter === 'Completed' ? t.completed
      : true
  )

  // keep localStorage in sync when we have fetched todos
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('tasks', JSON.stringify(todos))
      } catch (e) {}
    }
  }, [todos, isLoading])

  return (
    <div className="min-h-screen flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-2xl app-card">
        <Header />
        <AddTodo onAdd={add} />
        <CategoryFilter value={filter} onChange={setFilter} />
        <TodoList todos={filtered} onToggle={toggle} onDelete={del} onEdit={edit} />
      </div>
    </div>
  )
}

// persist to localStorage whenever todos change
// Note: using a separate effect at module level isn't allowed;
// we add a local effect by exporting a small wrapper component would be extra work.
