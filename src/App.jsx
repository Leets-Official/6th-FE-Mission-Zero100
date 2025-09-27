import React from 'react'; 

import Text from './components/text';
import Button from './components/button';
import Checkbox from './components/checkBox';
import Input from './components/input';
import CategoryButton from './components/categoryButton'; 
import TodoItem from './components/todoItem';

import './App.css'; 

function App() {
  const tasks = ["Eat", "Sleep", "Repeat"]

  return (
    <div className="outerContainer"> {/*UI들을 덩어리처럼 한 블록으로 만들어서 화면 중앙에 위치시키고 싶었음*/}
      <div className="innerContainer"> {/* UI 내용을 담는 블록 (좌측 정렬) */}
     
        <h1>TodoMatic</h1>
        <h2>What needs to be done?</h2>

        <div> 
          <Input />
          <Button>Add</Button>
        </div>

        <div>
          <CategoryButton>All</CategoryButton>
          <CategoryButton>Active</CategoryButton>
          <CategoryButton>Completed</CategoryButton>
        </div>


        <h2>{tasks.length} tasks remaining</h2>
        
        
        <ul>
         {tasks.map((taskName) =>(
          <TodoItem key={taskName} taskName={taskName}/>
         ))}
        </ul>
      </div>
    </div>
  );
}

export default App;