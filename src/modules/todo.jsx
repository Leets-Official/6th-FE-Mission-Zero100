import React from 'react';
import Checkbox from '../components/checkBox';

function Todo({ task, onToggle, onDelete }) {
  return (
    <li className="mb-4">
      <div className="flex items-center mb-2">
        <Checkbox 
          checked={task.completed}
          onChange={()=>onToggle}/>
        <span className={`ml-4 font-medium ${task.completed ? 'line-through text-gray-400' : 'text-slate-800'}`}>
          {task.text}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button className="py-2 px-4 text-sm font-semibold border border-gray-400 bg-white text-gray-700 hover:bg-gray-100">
          Edit
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          className="py-2 px-4 text-sm font-semibold text-white bg-red-700 hover:bg-red-800">
          Delete
        </button>
      </div>
    </li>
  );
}

export default Todo;