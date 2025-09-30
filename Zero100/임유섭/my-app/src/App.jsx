/* eslint-disable react/prop-types */
import { useState } from "react";

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
      <input
        placeholder="할 일을 입력하세요"
        className="mb-2 w-full rounded border border-gray-300 bg-white px-3 py-2 outline-none focus:border-black focus:ring-1 focus:ring-black"
      />
      <button className="block w-full rounded bg-black py-2 text-sm font-semibold text-white hover:bg-gray-800">
        Add
      </button>
    </section>
  );
}

function CategoryTabs({ value, onChange }) {
  const tabs = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];
  return (
    <div className="mb-4 flex gap-2">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`rounded border px-3 py-1 text-sm ${
            value === t.key
              ? "bg-gray-200 text-gray-800 border-gray-400"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function TodoItem({ text, done }) {
  return (
    <div className="flex items-center justify-between rounded border border-gray-200 bg-white p-3">
      <div className="flex items-center gap-3">
        <input type="checkbox" defaultChecked={done} className="h-5 w-5 accent-black" />
        <span className={done ? "line-through text-gray-400" : ""}>{text}</span>
      </div>
      <div className="flex gap-2">
        <button className="rounded border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300">
          Edit
        </button>
        <button className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500">
          Delete
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const todos = [
    { id: 1, text: "Eat", done: true },
    { id: 2, text: "Eat", done: false },
    { id: 3, text: "Eat", done: true },
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
