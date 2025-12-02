// src/pages/TodoPage.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, createTodo } from "../api/todoApi";

export default function TodoPage() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const { mutate: addTodo, isPending } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title.trim());
  };

  if (isLoading) {
    return <div>TODO 불러오는 중...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">TODO 리스트</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded-md px-3 py-2 text-sm"
          placeholder="할 일을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-4 rounded-md bg-blue-500 text-white text-sm"
        >
          추가
        </button>
      </form>

      <ul className="space-y-2 text-sm">
        {todos?.map((todo) => (
          <li key={todo.id} className="border rounded-md px-3 py-2">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
