import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

export default function AddTodo({ onAdd }) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    const v = value.trim();
    if (!v) return;
    onAdd(v);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className='mb-8'>
      <div className='mb-2'>
        <Input
          aria-label='New task'
          placeholder='Enter a task'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <Button variant='primary' onClick={handleAdd}>
        Add
      </Button>
    </div>
  );
}
