// src/App.jsx
import { useEffect, useState } from 'react';
import Header from './components/todo/Header';
import AddTodo from './components/todo/AddTodo';
import Category from './components/todo/Category';
import TodoList from './components/todo/TodoList';

export default function App() {
  // ✅ 최초 접속 시 localStorage에서 복원 (없으면 기본 3개)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved
      ? JSON.parse(saved)
      : [
          { id: 'list1', label: 'Eat', checked: false },
          { id: 'list2', label: 'Sleep', checked: false },
          { id: 'list3', label: 'Repeat', checked: false },
        ];
  });

  const [filter, setFilter] = useState('all');

  // ✅ tasks 변경 시마다 저장
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 추가
  const addTask = (label) => {
    const name = label.trim();
    if (!name) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), label: name, checked: false },
    ]);
  };

  // 체크 토글
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t)),
    );
  };

  // 삭제
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // ✅ 이름 수정(4주차)
  const editTask = (id, newLabel) => {
    const name = newLabel.trim();
    if (!name) return; // 빈 값 저장 방지
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, label: name } : t)),
    );
  };

  // 필터링
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.checked;
    if (filter === 'completed') return t.checked;
    return true; // all
  });

  // (선택) 현재 필터 기준 남은 할 일
  const leftCount = filteredTasks.filter((t) => !t.checked).length;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-14">
      <main className="w-[600px] bg-white rounded-sm p-10 shadow-[var(--shadow-card)]">
        <Header count={leftCount} />
        <AddTodo onAdd={addTask} />
        <Category filter={filter} setFilter={setFilter} />

        <TodoList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          // ✅ 편집 핸들러 전달
          onEdit={editTask}
        />
      </main>
    </div>
  );
}