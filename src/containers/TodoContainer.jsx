import { useState, useEffect } from "react";
import AddTodo from "../components/AddTodo";
import Category from "../components/Category";
import TodoList from "../components/TodoList";

export default function TodoContainer() {
    //  초기값을 localStorage에서 불러오기
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });

    const [filter, setFilter] = useState("All");

    //  tasks가 바뀔 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div>
            <AddTodo setTasks={setTasks} />
            <Category filter={filter} setFilter={setFilter} />
            <TodoList tasks={tasks} setTasks={setTasks} filter={filter} />
        </div>
    );
}
