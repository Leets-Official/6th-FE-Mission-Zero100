import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTodo from '../modules/AddTodo';
import TodoList from '../modules/TodoList';
import Category from '../modules/Category';

function TodoPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('all');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      const storedUserId = localStorage.getItem('userId');
      const loggedInUser = localStorage.getItem('loggedInUser');

      if (!token && !storedUserId && !loggedInUser) {
        console.log('로그인 정보가 없습니다. 로그인 페이지로 이동합니다.');
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      console.log('인증 정보 확인 완료');

      if (storedUserId) {
        setUserId(storedUserId);
        console.log('로그인 사용자 ID (API/저장된 값):', storedUserId);
      } else if (loggedInUser) {
        try {
          const user = JSON.parse(loggedInUser);
          setUserId(user.id); 
          console.log('일반 로그인 사용자 ID:', user.id);
        } catch (e) {
          console.error('사용자 정보 파싱 실패', e);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('loggedInUser');
          localStorage.removeItem('userId');
          navigate('/login');
          return;
        }
      } else {
        console.error('유효한 사용자 ID를 찾을 수 없습니다.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('userId');
        alert('사용자 정보를 불러올 수 없어 다시 로그인이 필요합니다.');
        navigate('/login');
        return;
      }
      
      setIsAuthenticated(true);
      setIsChecking(false);
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!isAuthenticated || !userId) return;

    const loadTodos = () => {
      try {
        console.log('할일 목록 불러오는 중... userId:', userId);
        const savedTodos = localStorage.getItem(`todos_${userId}`);
        
        if (savedTodos) {
          const parsedTodos = JSON.parse(savedTodos);
          console.log('불러온 할일 목록:', parsedTodos);
          setTasks(parsedTodos);
        } else {
          console.log('저장된 할일이 없습니다.');
          setTasks([]);
        }
      } catch (error) {
        console.error('할일 목록 불러오기 실패:', error);
        setTasks([]);
      }
    };

    loadTodos();
  }, [isAuthenticated, userId]);

  const saveTodos = (updatedTasks) => {
    try {
      localStorage.setItem(`todos_${userId}`, JSON.stringify(updatedTasks));
      console.log('할일 목록 저장 완료');
    } catch (error) {
      console.error('할일 목록 저장 실패:', error);
    }
  };

  const handleAddTask = (text) => {
    if (!userId) {
      alert('사용자 정보를 불러오는 중입니다.');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    console.log('할일 추가:', newTask);
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTodos(updatedTasks);
  };

  const handleToggleTask = (id) => {
    console.log('할일 상태 변경:', id);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTodos(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    console.log('할일 삭제:', id);
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTodos(updatedTasks);
  };

  const handleEditTask = (id, newText) => {
    console.log('할일 수정:', id, newText);
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    saveTodos(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (category === 'active') return !task.completed;
    if (category === 'completed') return task.completed;
    return true;
  });

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">TodoMatic</h1>
          <button
            onClick={() => {
              console.log('로그아웃 전 users 확인:', localStorage.getItem('users'));
              
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('loggedInUser');
              localStorage.removeItem('userId');
              
              console.log('로그아웃 후 users 확인:', localStorage.getItem('users'));
              alert('로그아웃 되었습니다.');
              navigate('/login', { replace: true });
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            로그아웃
          </button>
        </div>

        <AddTodo onAddTask={handleAddTask} />

        <Category selected={category} onCategoryChange={setCategory} />

        <TodoList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </div>
    </div>
  );
}

export default TodoPage;