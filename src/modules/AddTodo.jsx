import {useState} from 'react';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/button';

function AddTodo({onAddTask}) {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e)=>{
    setInputValue(e.target.value);
  };
  const handleAddTask = () =>{
    if(inputValue.trim()==='')return;
    onAddTask(inputValue);
    setInputValue('');
  };

  return (
    <div className="mb-6 text-center">
      <Text className="text-lg text-gray-600 mb-4">
        What needs to be done?
      </Text>
     
      <div className="flex flex-col gap-2">
        <Input 
        placeholder="할 일을 입력하세요"
        value={inputValue}
        onChange={handleInputChange} />
        <Button onClick={handleAddTask}>Add</Button>
      </div>
    </div>
  );
}

export default AddTodo;