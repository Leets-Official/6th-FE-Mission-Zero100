import Text from "./components/Text";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";
import "./App.css";

function App() {
  return (
    <>
      <Text tag="h1">TodoMatic</Text>
      <Text tag="h2">what needs to be done?</Text>
      <div>
        <Input/> <Button>Add</Button>
      </div>

      <div>
        <Button>Show all tasks</Button>
        <Button>Show active tasks</Button>
        <Button>Show completed tasks</Button>
      </div>
      
      <Text tag="h2">3 tasks remaining</Text>
      <ul>
        <li>
          <Checkbox id="list1" label="Eat"/>
          <div>
            <Button>Edit Eat</Button> <Button>Delete Eat</Button>
          </div>
        </li>
        <li>
          <Checkbox id="list2" label="Sleep"/>
          <div>
            <Button>Edit Sleep</Button> <Button>Delete Sleep</Button>
          </div>
        </li>
        <li>
          <Checkbox id="list3" label="Repeat"/>
          <div>
            <Button>Edit Repeat</Button> <Button>Delete Repeat</Button>
          </div>
        </li>
      </ul>
    </>
    
  )
}

export default App;
