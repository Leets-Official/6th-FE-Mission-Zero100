import React, { useState } from 'react';
import Header from './modules/header';
import AddTodo from './modules/addTodo';
import Category from './modules/category';
import TodoList from './modules/todoList'; 


const initialTasks = [
  { id: 1, text: 'Eat', completed: true },
  { id: 2, text: 'Sleep', completed: false },
  { id: 3, text: 'Repeat', completed: false },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedCategory, setSelectedCategory] = useState(null);
  

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(), 
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };


  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <Header />
        <AddTodo onAddTask={addTask} />
        <Category 
          selected={selectedCategory} 
          onCategoryChange={setSelectedCategory} />
        <TodoList 
          tasks={tasks} 
          onToggle={toggleTask} 
          onDelete={deleteTask} />
      </div>
    </div>
  );
}

export default App;