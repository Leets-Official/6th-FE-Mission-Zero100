import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

export const checkUserExists = (username) => {
  return apiClient.get(`/users?username=${username}`);
};

export const createUser = ({ username, password, name }) => {
  return apiClient.post('/users', { username, password, name });
};

export const loginUser = ({ username, password }) => {
  return apiClient.get(`/users?username=${username}&password=${password}`);
};


export const getTodosByUserId = (userId) => {
  return apiClient.get(`/todos?userId=${userId}`);
};

export const createTodo = (todo) => {
  return apiClient.post('/todos', todo);
};

export const deleteTodo = (todoId) => {
  return apiClient.delete(`/todos/${todoId}`);
};

export const updateTodo = (todoId, updates) => {
  return apiClient.patch(`/todos/${todoId}`, updates);
};