import React from 'react';
import Todo from './todo';

function TodoList({ tasks, onToggle, onDelete }) {
  const remainingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        {remainingTasks} tasks remaining
      </h2>
      <ul>
        {tasks.map((task) => (
          <Todo 
            key={task.id} 
            task={task} 
            onToggle={onToggle} 
            onDelete={onDelete} 
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;