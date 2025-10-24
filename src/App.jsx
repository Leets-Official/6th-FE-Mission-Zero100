import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import Category from "./components/Category";
import TodoList from "./components/TodoList";
import "./App.css";

export default function App() {
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
