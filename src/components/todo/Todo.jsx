import Checkbox from '../common/Checkbox';
import Button from '../common/Button';

export default function Todo({ id, label, checked, onToggle, onDelete }) {
  return (
    <li className='pb-6'>
      <div className='mb-4'>
        <Checkbox
          id={`todo-${id}`}
          label={label}
          checked={checked}
          onChange={() => onToggle(id)}
          labelClassName={checked ? 'line-through text-gray-500' : ''}
        />
      </div>

      <div className='flex gap-3'>
        <Button variant='outline' className='flex-1'>
          Edit
        </Button>
        <Button variant='danger' className='flex-1' onClick={() => onDelete(id)}>
          Delete
        </Button>
      </div>
    </li>
  );
}
