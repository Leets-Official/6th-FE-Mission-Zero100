import { useState } from "react";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import Category from "./components/Category";
import TodoList from "./components/TodoList";
export default function App() {

    const [tasks, setTasks] = useState([
        { label: "Eat", completed: false },
        { label: "Sleep", completed: false },
        { label: "Repeat", completed: false },
    ]);

    const [filter, setFilter] = useState("All");

    return (
        <div className="max-w-xl mx-auto p-6">
            <Header />
            {/* setTasks를 AddTodo로 전달 */}
            <AddTodo setTasks={setTasks} />
            <Category filter={filter} setFilter={setFilter} />
            {/*  tasks 상태를 TodoList로 전달 */}
            <TodoList tasks={tasks} setTasks={setTasks} filter={filter} />
        </div>
    );
}
