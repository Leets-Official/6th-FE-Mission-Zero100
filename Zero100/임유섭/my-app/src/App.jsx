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
    <div className="mb-4 flex gap-2">
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
    <div className="flex items-center justify-between rounded border border-gray-200 bg-white p-3">
      <div className="flex items-center gap-3">
        <Checkbox defaultChecked={done} />
        <Text className={done ? 'line-through text-gray-400' : ''}>{text}</Text>
      </div>
      <div className="flex gap-2">
        <Button className="rounded border border-gray-300 bg-gray-200 text-gray-700 hover:bg-gray-300">
          Edit
        </Button>
        <Button className="rounded bg-red-600 text-white hover:bg-red-500">
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
    <div className="min-h-screen">
      <main className="container mx-auto max-w-xl md:max-w-2xl px-4 py-8 rounded bg-white shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
        <Header />
        <AddTodo />
        <CategoryTabs value={filter} onChange={setFilter} />

        <p className="mb-3 text-lg font-semibold text-gray-700">3 tasks remaining</p>

        <div className="space-y-4">
          {todos.map((t) => (
            <TodoItem key={t.id} text={t.text} done={t.done} />
          ))}
        </div>
      </main>
    </div>
  );
}
