import { useState } from 'react';
import Checkbox from './Checkbox';
import Button from './Button';
import Text from './Text';
import Input from './Input';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const { id, title, completed } = todo;
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(title);

  const startEdit = () => {
    setEditText(title);
    setEditing(true);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const v = editText.trim();
    if (!v) return;
    onEdit?.(id, v);
    setEditing(false);
  };

  return (
    <li className="p-3">
      <div className="flex items-center gap-3">
        {editing ? (
          <div className="flex-1">
            <Text as="label" className="text-lg text-gray-700 block mb-2">New name for {title}</Text>
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full border px-3 py-3"
            />
          </div>
        ) : (
          <>
            <Checkbox
              checked={!!completed}
              onChange={() => onToggle?.(id)}
              className="w-10 h-10"
            />
            <Text className={`text-base ${completed ? 'line-through text-gray-400' : ''}`}>
              {title}
            </Text>
          </>
        )}
      </div>

      {/* buttons row below the title */}
      <div className="mt-3 flex gap-3">
        {editing ? (
          <>
            <Button onClick={() => { setEditText(title); setEditing(false); }} className="flex-1 h-10 border">
              Cancel
            </Button>
            <Button type="submit" onClick={saveEdit} className="flex-1 h-10 bg-black text-white">
              Save
            </Button>
          </>
        ) : (
          <>
            <Button onClick={startEdit} className="flex-1 h-10 border">
              Edit
            </Button>
            <Button onClick={() => onDelete?.(id)} className="flex-1 h-10 bg-red-500 text-white">
              Delete
            </Button>
          </>
        )}
      </div>
    </li>
  );
}
