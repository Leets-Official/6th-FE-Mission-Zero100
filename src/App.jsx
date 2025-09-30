import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import Category from "./components/Category";
import TodoList from "./components/TodoList";

function Home() {
    const tasks = ["Eat", "Sleep", "Repeat"];

    return (
        <div className="max-w-xl mx-auto p-6">
            <Header />
            <AddTodo />
            <Category />
            <TodoList tasks={tasks} />
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}
