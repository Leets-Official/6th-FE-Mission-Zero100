/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import Checkbox from './components/Checkbox';
import Text from './components/Text';

function Header() {
  return (
    <h1 className="mb-4 text-center text-3xl font-bold text-gray-700">TodoMatic</h1>
  );
}

function AddTodo() {
  return (
    <section className="mb-3">
      <label className="mb-2 block text-center text-sm text-gray-600">
        What needs to be done?
      </label>
      <Input placeholder="할 일을 입력하세요" className="mb-2 w-full" />
      <Button className="block w-full rounded bg-black text-white hover:bg-gray-800">
        Add
      </Button>
    </section>
  );
}

function CategoryTabs({ value, onChange }) {
  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="mb-4 flex justify-center gap-2">
      {tabs.map((t) => (
        <Button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`rounded border px-3 py-1 ${
            value === t.key
              ? 'bg-gray-200 text-gray-800 border-gray-400'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          {t.label}
        </Button>
      ))}
    </div>
  );
}

function TodoItem({ text, done }) {
  return (
    <div className="rounded border border-gray-200 bg-white p-3">
      {/* 체크박스 & 텍스트 */}
      <div className="flex items-center gap-3 mb-2">
        <Checkbox defaultChecked={done} />
        <Text className={done ? 'line-through text-gray-400' : ''}>{text}</Text>
      </div>
      {/* 버튼 */}
      <div className="flex gap-2">
        <Button className="flex-1 rounded border border-gray-300 bg-gray-200 text-gray-700 hover:bg-gray-300">
          Edit
        </Button>
        <Button className="flex-1 rounded bg-red-600 text-white hover:bg-red-500">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState('all');
  const todos = [
    { id: 1, text: 'Eat', done: true },
    { id: 2, text: 'Eat', done: false },
    { id: 3, text: 'Eat', done: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <main className="w-[360px] bg-white border border-gray-300 shadow-sm p-5">
        <Header />
        <AddTodo />
        <CategoryTabs value={filter} onChange={setFilter} />

        <p className="mb-3 text-lg font-semibold text-gray-700">
          {todos.length} tasks remaining
        </p>

        <div className="space-y-4">
          {todos.map((t) => (
            <TodoItem key={t.id} text={t.text} done={t.done} />
          ))}
        </div>
      </main>
    </div>
  );
}
