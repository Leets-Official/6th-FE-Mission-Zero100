import React from 'react';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/button';

function AddTodo() {
  return (
    <div className="mb-6 text-center">
      <Text className="text-lg text-gray-600 mb-4">
        What needs to be done?
      </Text>
     
      <div className="flex flex-col gap-2">
        <Input placeholder="할 일을 입력하세요" />
        <Button>Add</Button>
      </div>
    </div>
  );
}

export default AddTodo;