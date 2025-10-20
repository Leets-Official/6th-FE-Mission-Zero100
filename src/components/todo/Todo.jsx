import { useState } from 'react';
import Checkbox from '../common/Checkbox';
import Button from '../common/Button';
import Input from '../common/Input';

export default function Todo({ id, label, checked, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(label);

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (!trimmed) return;
    onEdit(id, trimmed);
    setIsEditing(false);
  };

  return (
    <li className='pb-6'>
      <div className='mb-4'>
        {isEditing ? (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className='border-gray-400'
          />
        ) : (
          <Checkbox
            id={`todo-${id}`}
            label={label}
            checked={checked}
            onChange={() => onToggle(id)}
            labelClassName={checked ? 'line-through text-gray-500' : ''}
          />
        )}
      </div>

      <div className='flex gap-4'>
        {isEditing ? (
          <>
            <Button variant='primary' className='flex-1' onClick={handleSave}>
              Save
            </Button>
            <Button variant='outline' className='flex-1' onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant='outline' className='flex-1' onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button variant='danger' className='flex-1' onClick={() => onDelete(id)}>
              Delete
            </Button>
          </>
        )}
      </div>
    </li>
  );
}
