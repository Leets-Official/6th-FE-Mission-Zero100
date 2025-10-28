import {useState, useEffect} from 'react';
import Checkbox from '../components/checkBox';
import Button from '../components/button';

function Todo({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] =useState(task.text);

  function handleSave(){
    onEdit(task.id, newName);
    setIsEditing(false);
  }
  function handleCancel(){
    setIsEditing(fasle);
    setNewName(task.text);
  }

  const viewTemplate = (
    <>
    <div className='flex items-center mb-2'>
      <Checkbox 
        checked={task.completed} 
        onChange={()=>onToggle(task.id)}
        />
        <span className={`ml-4 font-medium ${task.completed ? 'line-through text-gray-400' : 'text-slate-800'}`}>
          {task.text}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={() => setIsEditing(true)} // 클릭 시 수정 모드로 변경
          className="py-2 px-4 text-sm font-semibold border border-gray-400 bg-white text-gray-700 hover:bg-gray-100"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          className="py-2 px-4 text-sm font-semibold text-white bg-red-700 hover:bg-red-800"
        >
          Delete
        </button>
      </div>
    </>
  );

  const editTemplate = (
    <>
      <div className="mb-2">
        <label 
          htmlFor={`edit-${task.id}`} 
          className="block mb-1 text-sm text-gray-700"
        >
          New name for {task.text}
        </label>
        <input
          id={`edit-${task.id}`}
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full p-2 border border-gray-400 rounded"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button 
          onClick={handleCancel}
          className="py-2 px-4 text-sm font-semibold border border-gray-400 bg-white text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  );

  return (
    <li className="mb-4">
      {isEditing ? editTemplate : viewTemplate}
    </li>
  );

}

export default Todo;