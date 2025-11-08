import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import Text from './Text';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    onAdd?.(v);
    setText('');
  };

  return (
    <form onSubmit={submit} className="mb-6">
      {/* big input with thick border */}
      <div className="mb-3">
        <Input
          className="w-full h-14 thick-input px-3"
          placeholder=""
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* full width black Add button */}
      <div className="mb-4">
        <Button
          type="submit"
          className="w-full h-12 bg-black text-white text-lg font-medium"
        >
          Add
        </Button>
      </div>
    </form>
  );
}
