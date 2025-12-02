// src/api/todoApi.js
import apiClient from "./client";

// TODO 목록 조회
export const fetchTodos = async () => {
  const res = await apiClient.get("/todos"); // 실제 경로 확인
  return res.data;
};

// TODO 추가
export const createTodo = async (title) => {
  const res = await apiClient.post("/todos", { title }); // 실제 경로 확인
  return res.data;
};

// TODO 완료 토글 등 나중에 필요하면 추가
