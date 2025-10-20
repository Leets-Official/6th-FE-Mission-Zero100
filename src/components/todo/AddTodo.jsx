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

  return (
    <div className='mb-8'>
      <div className='mb-2'>
        <Input
          aria-label='New task'
          placeholder='Enter a task'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <Button variant='primary' onClick={handleAdd}>
        Add
      </Button>
    </div>
  );
}
