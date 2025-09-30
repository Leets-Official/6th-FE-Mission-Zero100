

import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import Category from "./components/Category";
import "./App.css";

function App() {
  const tasks = [
    { id: "list1", label: "Eat", checked: false },
    { id: "list2", label: "Sleep", checked: false },
    { id: "list3", label: "Repeat", checked: false },
  ];

  return (
    <>
      <h1>TodoMatic</h1>
      <h2>What needs to be done?</h2>

      <AddTodo />
      <Category />

      <h2>3 tasks remaining</h2>
      <ul>
        {tasks.map((task) => (
          <Todo
            key={task.id}
            id={task.id}
            label={task.label}
            checked={task.checked}
          />
        ))}
      </ul>
    </>
  );
}

export default App;

