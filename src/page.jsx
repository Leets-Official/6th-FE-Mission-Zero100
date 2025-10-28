import { useState, useEffect } from 'react'
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import CategoryFilter from './components/CategoryFilter'
import TodoList from './components/TodoList'

// ID 시퀀스 (초기값은 1, 로컬스토리지에서 읽어서 갱신될 수 있음)
let nextId = 1

export default function Home() {
  // lazy init: try to read from localStorage, otherwise start with empty list
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem('tasks')
      const parsed = raw ? JSON.parse(raw) : []
      // ensure nextId is set to avoid id collisions
      if (Array.isArray(parsed) && parsed.length > 0) {
        const max = parsed.reduce((m, t) => (t.id > m ? t.id : m), 0)
        nextId = max + 1
      }
      return Array.isArray(parsed) ? parsed : []
    } catch (e) {
      return []
    }
  })
  const [filter, setFilter] = useState('All') // All | Active | Completed

  // 추가/토글/삭제
  const add = (title) =>
    setTodos(prev => [{ id: nextId++, title, completed: false }, ...prev])

  const toggle = (id) =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))

  const del = (id) =>
    setTodos(prev => prev.filter(t => t.id !== id))

  const edit = (id, title) =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, title } : t)))

  // 필터 적용
  const filtered = todos.filter(t =>
    filter === 'Active' ? !t.completed
      : filter === 'Completed' ? t.completed
      : true
  )

  // persist todos to localStorage so list survives reloads
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(todos))
    } catch (e) {
      // ignore write errors
    }
  }, [todos])

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
