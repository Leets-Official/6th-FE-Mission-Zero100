import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import AddTodo from '../modules/AddTodo';
import TodoList from '../modules/TodoList';
import Category from '../modules/Category';

function TodoPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // 토큰 및 사용자 정보 확인
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        console.log('토큰이 없습니다. 로그인 페이지로 이동합니다.');
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      console.log('토큰 확인 완료:', token.substring(0, 20) + '...');
      
      // 사용자 정보 확인 (기존 로그인 방식)
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        setUserId(user.id);
        console.log('사용자 ID:', user.id);
      } else {
        // 카카오 로그인의 경우 사용자 ID가 없을 수 있음
        // 백엔드에서 토큰으로 사용자를 식별하도록 userId를 'kakao'로 설정
        setUserId('kakao');
        console.log('카카오 로그인 사용자');
      }
      
      setIsAuthenticated(true);
      setIsChecking(false);
    };

    checkAuth();
  }, [navigate]);

  // 할일 목록 불러오기
  useEffect(() => {
    const fetchTodos = async () => {
      if (!isAuthenticated || !userId) return;

      setIsLoading(true);
      try {
        console.log('할일 목록 불러오는 중...');
        const response = await api.get(`/todos?userId=${userId}`);
        console.log('불러온 할일 목록:', response.data);
        setTasks(response.data);
      } catch (error) {
        console.error('할일 목록 불러오기 실패:', error);
        // 에러가 발생해도 빈 배열로 시작
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [isAuthenticated, userId]);

  // Todo 추가
  const handleAddTask = async (text) => {
    if (!userId) {
      alert('사용자 정보를 불러오는 중입니다.');
      return;
    }

    try {
      const newTask = {
        userId: userId,
        text: text,
        completed: false,
      };

      console.log('할일 추가 중:', newTask);
      const response = await api.post('/todos', newTask);
      console.log('추가된 할일:', response.data);
      
      // 서버에서 반환된 할일(id 포함)을 state에 추가
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('할일 추가 실패:', error);
      alert('할일 추가에 실패했습니다.');
    }
  };

  // Todo 토글 (완료/미완료)
  const handleToggleTask = async (id) => {
    try {
      const task = tasks.find(t => t.id === id);
      const updatedTask = { ...task, completed: !task.completed };
      
      console.log('할일 상태 변경 중:', updatedTask);
      await api.patch(`/todos/${id}`, { completed: updatedTask.completed });
      
      setTasks(
        tasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error('할일 상태 변경 실패:', error);
      alert('할일 상태 변경에 실패했습니다.');
    }
  };

  // Todo 삭제
  const handleDeleteTask = async (id) => {
    try {
      console.log('할일 삭제 중:', id);
      await api.delete(`/todos/${id}`);
      
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('할일 삭제 실패:', error);
      alert('할일 삭제에 실패했습니다.');
    }
  };

  // Todo 수정
  const handleEditTask = async (id, newText) => {
    try {
      console.log('할일 수정 중:', id, newText);
      await api.patch(`/todos/${id}`, { text: newText });
      
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: newText } : task
        )
      );
    } catch (error) {
      console.error('할일 수정 실패:', error);
      alert('할일 수정에 실패했습니다.');
    }
  };

  // 카테고리별 필터링
  const filteredTasks = tasks.filter((task) => {
    if (category === 'active') return !task.completed;
    if (category === 'completed') return task.completed;
    return true; // 'all'
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
    return null; // 리디렉션 중
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">TodoMatic</h1>
          <button
            onClick={() => {
              localStorage.clear();
              alert('로그아웃 되었습니다.');
              navigate('/login');
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            로그아웃
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
            <p className="text-gray-600">할일 목록을 불러오는 중...</p>
          </div>
        ) : (
          <>
            <AddTodo onAddTask={handleAddTask} />

            <Category selected={category} onCategoryChange={setCategory} />

            <TodoList
              tasks={filteredTasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TodoPage;