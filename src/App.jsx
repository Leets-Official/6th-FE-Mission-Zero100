import { useState } from 'react';
import Header from './components/todo/Header';
import AddTodo from './components/todo/AddTodo';
import Category from './components/todo/Category';
import TodoList from './components/todo/TodoList';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 'list1', label: 'Eat', checked: false },
    { id: 'list2', label: 'Sleep', checked: false },
    { id: 'list3', label: 'Repeat', checked: false },
  ]);
  const [filter, setFilter] = useState('all');

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

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.checked;
    if (filter === 'completed') return t.checked;
    return true;
  });

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center py-14'>
      <div className='w-[600px] bg-white rounded-sm p-10 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_12px_40px_rgba(0,0,0,0.08)]'>
        <Header count={filteredTasks.length} />
        <AddTodo onAdd={addTask} />
        <Category filter={filter} setFilter={setFilter} />
        <TodoList
          count={filteredTasks.length}
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}
