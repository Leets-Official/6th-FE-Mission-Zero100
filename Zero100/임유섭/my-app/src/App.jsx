/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import Checkbox from './components/Checkbox';
import Text from './components/Text';

/* ---------------- UI 구성 요소 ---------------- */

function Header() {
  return (
    <h1 className="mb-2 text-center text-2xl font-bold">TodoMatic</h1>
  );
}

function CategoryTabs({ value, onChange }) {
  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="mt-3 mb-2 flex justify-center gap-2">
      {tabs.map((t) => (
        <Button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`rounded-none border px-4 py-[2px] text-[12px] ${
            value === t.key
              ? 'bg-gray-200 text-gray-900 border-gray-400'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          {t.label}
        </Button>
      ))}
    </div>
  );
}

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="rounded border border-gray-300 bg-white p-3">
      {/* 1줄: 체크박스 + 텍스트 */}
      <div className="flex items-center gap-3">
        <Checkbox checked={todo.done} onChange={() => onToggle(todo.id)} />
        <Text className={todo.done ? 'line-through text-gray-400' : ''}>
          {todo.text}
        </Text>
      </div>

      {/* 2줄: 버튼 두 개 (가로로 꽉 차도록) */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Button className="w-full rounded-none border border-gray-300 bg-gray-200 text-gray-800 hover:bg-gray-300">
          Edit
        </Button>
        <Button
          className="w-full rounded-none bg-red-600 text-white hover:bg-red-500"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

/* ---------------- 메인 앱 ---------------- */

export default function App() {
  // 입력창
  const [newText, setNewText] = useState('');

  // 할 일 목록
  const [todos, setTodos] = useState([
    { id: 1, text: 'Eat', done: true },
    { id: 2, text: 'Eat', done: false },
    { id: 3, text: 'Eat', done: true },
  ]);

  // 필터: all | active | completed
  const [filter, setFilter] = useState('all');

  // 추가
  const addTodo = () => {
    const text = newText.trim();
    if (!text) return;
    setTodos((prev) => [
      { id: Date.now(), text, done: false },
      ...prev,
    ]);
    setNewText('');
  };

  // 삭제
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // 완료 토글
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // 필터 반영된 목록
  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'completed') return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  // 남은 개수 (미완료)
  const leftCount = useMemo(
    () => todos.filter((t) => !t.done).length,
    [todos]
  );

  // 엔터로 추가
  const onKeyDown = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <main className="mx-auto mt-6 w-[360px] rounded border border-gray-300 bg-white p-5 shadow-sm">
        <Header />
        <p className="mt-1 text-center text-sm text-gray-600">What needs to be done?</p>

        <Input
          placeholder="할 일을 입력하세요"
          className="mt-3 h-10 w-full rounded-none border-2 border-gray-400 px-3 placeholder:text-gray-400 focus:outline-none focus:ring-0"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button className="mt-2 w-full rounded-none bg-black text-white" onClick={addTodo}>
          Add
        </Button>

        <CategoryTabs value={filter} onChange={setFilter} />

        <p className="mt-2 mb-3 text-sm font-semibold text-gray-700">
          {leftCount} tasks remaining
        </p>

        <div className="space-y-3">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
