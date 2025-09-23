import React from 'react'; 

import Text from './components/text';
import Button from './components/button';
import Checkbox from './components/checkBox';
import Input from './components/input';

import './App.css'; 

function App() {
  return (
    <div className="outerContainer"> {/*UI들을 덩어리처럼 한 블록으로 만들어서 화면 중앙에 위치시키고 싶었음*/}
      <div className="innerContainer"> {/* UI 내용을 담는 블록 (좌측 정렬) */}
     
        <h1>TodoMatic</h1>
        <h2>What needs to be done?</h2>
        

        <div> {/*첫 번째로 나타난 div*/}
          <Input />
          <Button>Add</Button>
        </div>

       
        <div>  {/*두 번째로 나타난 div*/}
          <Button>Show all tasks</Button>
          <Button>Show active tasks</Button>
          <Button>Show completed tasks</Button>
        </div>

     
        <h2>3 tasks remaining</h2>
        
        
        <ul>
          {/* 첫 번째 할 일: Eat */}
          <li>
            <Checkbox label="Eat" />
            <Button>Edit Eat</Button>
            <Button>Delete Eat</Button>
          </li>
          
          {/* 두 번째 할 일: Sleep */}
          <li>
            <Checkbox label="Sleep" />
            <Button>Edit Sleep</Button>
            <Button>Delete Sleep</Button>
          </li>

          {/* 세 번째 할 일: Repeat */}
          <li>
            <Checkbox label="Repeat" />
            <Button>Edit Repeat</Button>
            <Button>Delete Repeat</Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;