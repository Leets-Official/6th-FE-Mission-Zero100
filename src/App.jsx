import { useState } from 'react';
import Header from './modules/header';
import AddTodo from './modules/addTodo';
import Category from './modules/category';
import TodoList from './modules/todoList'; 


const initialTasks = [
  { id: 1, text: 'Eat', completed: false },
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

  const editTask = (taskId, newName) => {
    setTasks(tasks.map(task=>
      task.id === taskId ? {...task, text: newName} : task
    ));
  };


  const filteredTasks = tasks.filter(task =>{
    if(selectedCategory === 'active'){
      return !task.completed;
    }
    if(selectedCategory === 'completed'){
      return task.completed;
    }
    return true; //all이면 그냥 할일 다 보여줌
  })




  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <Header />
        <AddTodo onAddTask={addTask} />
        <Category 
          selected={selectedCategory} 
          onCategoryChange={setSelectedCategory} />
        <TodoList 
          tasks={filteredTasks} 
          onToggle={toggleTask} 
          onDelete={deleteTask} 
          onEdit={editTask}
          />
      </div>
    </div>
  );
}

export default App;