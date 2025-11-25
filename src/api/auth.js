// [중요] axios를 직접 쓰지 말고, 우리가 만든 똑똑한 'api'를 가져와야 합니다.
// 경로가 ../api/axios 가 아니라 같은 폴더면 ./axios 일 수 있습니다. 확인해주세요!
import { api } from './axios'; 

export const checkUserExists = (username) => {
  return api.get(`/users?username=${username}`);
};

export const createUser = ({ username, password, name }) => {
  return api.post('/users', { username, password, name });
};

export const loginUser = ({ username, password }) => {
  return api.get(`/users?username=${username}&password=${password}`);
};

export const getTodosByUserId = (userId) => {
  // [핵심] 이제 api.get을 쓰니까 토큰이 자동으로 헤더에 실려갑니다!
  return api.get(`/todos?userId=${userId}`);
};

export const createTodo = (todo) => {
  return api.post('/todos', todo);
};

export const deleteTodo = (todoId) => {
  return api.delete(`/todos/${todoId}`);
};

export const updateTodo = (todoId, updates) => {
  return api.patch(`/todos/${todoId}`, updates);
};