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
    <form onSubmit={submit} className="bg-white rounded-2xl shadow p-6 mb-6">
      <Text className="block text-base mb-3">What needs to be done?</Text>

      {/* 입력창 */}
      <Input
        className="w-full h-12 rounded-lg border px-4"
        placeholder="Add a task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* 과제 스타일: 아래 전체폭 검은 버튼 */}
      <Button
        type="submit"
        className="mt-3 w-full h-11 rounded-md bg-black text-white"
      >
        Add
      </Button>
    </form>
  );
}
