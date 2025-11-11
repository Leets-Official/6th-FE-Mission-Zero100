import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../modules/Header';
import AddTodo from '../modules/AddTodo';
import Category from '../modules/Category';
import TodoList from '../modules/TodoList';

import { 
  getTodosByUserId, 
  createTodo, 
  deleteTodo, 
  updateTodo 
} from '../api/auth';

function TodoPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); 
  const [tasks, setTasks] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (!storedUser) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  
  useEffect(() => {
    if (user) { 
      const fetchTasks = async () => { 
        try {
          const response = await getTodosByUserId(user.id); 
          setTasks(response.data);
        } catch (error) {
          console.error("Todo 목록 로딩 실패:", error);
        }
      };
      fetchTasks();
    }
  }, [user]); 

  
  const addTask = async (taskText) => {
    if (!user) return; 

    const newTask = {
      text: taskText,
      completed: false,
      userId: user.id 
    };
    
    try {
      const response = await createTodo(newTask);
      setTasks([...tasks, response.data]); 
    } catch (error) {
      console.error("Todo 추가 실패:", error);
    }
  };


  const deleteTask = async (taskId) => {
    try {
      await deleteTodo(taskId);
      setTasks(tasks.filter(task => task.id !== taskId)); 
    } catch (error) {
      console.error("Todo 삭제 실패:", error);
    }
  };


  const toggleTask = async (taskId) => {
    const taskToToggle = tasks.find(task => task.id === taskId);
    if (!taskToToggle) return;

    try {
     
      await updateTodo(taskId, { completed: !taskToToggle.completed }); 
      
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error("Todo 토글 실패:", error);
    }
  };


  const editTask = async (taskId, newName) => {
    try {
      await updateTodo(taskId, { text: newName });
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, text: newName } : task
      ));
    } catch (error) {
      console.error("Todo 수정 실패:", error);
    }
  };

  
  const filteredTasks = tasks.filter(task => {
    if (selectedCategory === 'active') {
      return !task.completed;
    }
    if (selectedCategory === 'completed') {
      return task.completed;
    }
    return true; 
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