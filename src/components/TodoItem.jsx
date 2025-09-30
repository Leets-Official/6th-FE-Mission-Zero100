import Checkbox from './Checkbox';
import Button from './Button';
import Text from './Text';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const { id, title, completed } = todo;

  return (
    <li className="flex items-center justify-between gap-3 p-3 border rounded-lg">
      <div className="flex items-center gap-3 flex-1">
        <Checkbox
          checked={!!completed}
          onChange={() => onToggle?.(id)}
          className="size-5"
        />
        <Text className={`text-base ${completed ? 'line-through text-gray-400' : ''}`}>
          {title}
        </Text>
      </div>
      <div className="flex gap-2">
        <Button className="h-9 px-4 rounded-md border">Edit</Button>
        <Button className="h-9 px-4 rounded-md bg-red-500 text-white">Delete</Button>
      </div>
    </li>
  );
}
