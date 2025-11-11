import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../modules/Header';
import AddTodo from '../modules/AddTodo';
import Category from '../modules/Category';
import TodoList from '../modules/TodoList'; 

function TodoPage() {
  const navigate = useNavigate(); 


  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      alert('로그인이 필요합니다.');
      navigate('/login'); 
    }
  }, [navigate]); 

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks'); 
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
    return [];
  });
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, text: newName } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedCategory === 'active') {
      return !task.completed;
    }
    if (selectedCategory === 'completed') {
      return task.completed;
    }
    return true; //all이면 그냥 할일 다 보여줌
  });

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

export default TodoPage;