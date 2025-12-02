import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddTodo from "@/components/AddTodo";
import Category from "@/components/Category";
import TodoList from "@/components/TodoList";
import Header from "@/components/Header";

export default function TodoPage() {
  const navigate = useNavigate();

  //  로그인 체크
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, []);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <Header />
      <AddTodo setTasks={setTasks} />
      <Category filter={filter} setFilter={setFilter} />
      <TodoList tasks={tasks} setTasks={setTasks} filter={filter} />
    </div>
  );
}
