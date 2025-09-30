
import { useState } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import Category from "./components/Category";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: "list1", label: "Eat", checked: false },
    { id: "list2", label: "Sleep", checked: false },
    { id: "list3", label: "Repeat", checked: false },
  ]);

  const handleToggle = (id) => {
  setTasks((prev) =>
    prev.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task
    )
  );
};


  return (
    <div className="min-h-screen bg-white-100 py-10 px-5 w-[500px] mx-auto" >
      <h1 className="text-center text-3xl font-bold">TodoMatic</h1>
      <h2 className="mt-3 text-center text-gray-600">What needs to be done?</h2>

      <AddTodo />
      <Category />

      <h2 className="px-6 mt-6 text-lg font-semibold text-gray-700">3 tasks remaining</h2>
      <ul className="space-y-6 px-6">
        {tasks.map((task) => (
          <Todo
            key={task.id}
            id={task.id}
            label={task.label}
            checked={task.checked}
            onToggle={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

