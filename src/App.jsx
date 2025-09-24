import Text from "./components/Text";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";

export default function App() {
  return (
    <div>
      <Text as="h1">TodoMatic</Text>
      <Text as="h2">What needs to be done?</Text>

      <div>
        <Input placeholder="Enter a task" />
        <Button>Add</Button>
      </div>

      <div>
        <Button>Show all tasks</Button>
        <Button>Show active tasks</Button>
        <Button>Show completed tasks</Button>
      </div>

      <Text as="h2">3 tasks remaining</Text>

      <ul>
        <li>
          <Checkbox label="Eat" />
          <div>
            <Button>Edit Eat</Button>
            <Button>Delete Eat</Button>
          </div>
        </li>
        <li>
          <Checkbox label="Sleep" />
          <div>
            <Button>Edit Sleep</Button>
            <Button>Delete Sleep</Button>
          </div>
        </li>
        <li>
          <Checkbox label="Repeat" />
          <div>
            <Button>Edit Repeat</Button>
            <Button>Delete Repeat</Button>
          </div>
        </li>
      </ul>
    </div>
  );
}