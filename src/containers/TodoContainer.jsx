import { useEffect, useState } from 'react';
import Header from '../components/todo/Header';
import AddTodo from '../components/todo/AddTodo';
import Category from '../components/todo/Category';
import TodoList from '../components/todo/TodoList';

export default function TodoContaier() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (label) => {
    if (!label.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now().toString(), label, checked: false }]);
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id, newLabel) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, label: newLabel } : t)));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.checked;
    if (filter === 'completed') return t.checked;
    return true;
  });

  return (
    <>
      <Header />
      <AddTodo onAdd={addTask} />
      <Category filter={filter} setFilter={setFilter} />
      <TodoList
        count={filteredTasks.length}
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </>
  );
}
