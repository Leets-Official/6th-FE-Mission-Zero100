import { useState } from 'react';

export default function AddTodo({ onAdd }) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    onAdd(value);
    setValue('');
  };

  return (
    <div className='mb-8'>
      <input
        type='text'
        placeholder='Enter a task'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='w-full border-2 border-gray-400 p-3'
      />
      <button onClick={handleAdd} className='w-full bg-black text-white rounded-none py-3 mt-3'>
        Add
      </button>
    </div>
  );
}
