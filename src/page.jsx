import { useState } from 'react'
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import CategoryFilter from './components/CategoryFilter'
import TodoList from './components/TodoList'

// 초기 데이터 & ID 시퀀스
let nextId = 4
const initial = [
  { id: 1, title: 'Eat', completed: false },
  { id: 2, title: 'Sleep', completed: true },
  { id: 3, title: 'Repeat', completed: false },
]

export default function Home() {
  const [todos, setTodos] = useState(initial)
  const [filter, setFilter] = useState('All') // All | Active | Completed

  // 추가/토글/삭제
  const add = (title) =>
    setTodos(prev => [{ id: nextId++, title, completed: false }, ...prev])

  const toggle = (id) =>
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))

  const del = (id) =>
    setTodos(prev => prev.filter(t => t.id !== id))

  // 필터 적용
  const filtered = todos.filter(t =>
    filter === 'Active' ? !t.completed
      : filter === 'Completed' ? t.completed
      : true
  )

  return (
    <main className="max-w-screen-sm md:max-w-2xl lg:max-w-4xl mx-auto px-4 py-6">
      <Header />
      <AddTodo onAdd={add} />
      <CategoryFilter value={filter} onChange={setFilter} />
      <TodoList todos={filtered} onToggle={toggle} onDelete={del} />
    </main>
  )
}
