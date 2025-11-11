import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import AddTodo from "../components/AddTodo.jsx";
import Category from "../components/Category.jsx";
import TodoList from "../components/TodoList.jsx";

export default function Todo() {
  // 초기화: localStorage 복원(없으면 기본 3개)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) return JSON.parse(saved);
    return [
      { id: "list1", label: "Eat", checked: false },
      { id: "list2", label: "Sleep", checked: false },
      { id: "list3", label: "Repeat", checked: false },
    ];
  });

  const [filter, setFilter] = useState("all");

  // 변경사항 저장
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
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
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  // 삭제
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // 수정
  const editTask = (id, newLabel) => {
    const name = newLabel.trim();
    if (!name) return;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, label: name } : t)));
  };

  // 필터
  const filtered = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "active") return !t.checked;
    if (filter === "done") return t.checked;
    return true;
  });

  return (
    <div className="container">
      <Header />
      <div className="card">
        <h2 className="title">Todo</h2>
        <AddTodo onAdd={addTask} />
        <Category value={filter} onChange={setFilter} />
        <TodoList
          tasks={filtered}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </div>
    </div>
  );
}
