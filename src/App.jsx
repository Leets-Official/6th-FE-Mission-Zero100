import Text from "./components/Text";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Input from "./components/Input";

export default function App() {
  const tasks = [
    { id: "list1", label: "Eat", checked: false },
    { id: "list2", label: "Sleep", checked: false },
    { id: "list3", label: "Repeat", checked: false },
  ];

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

      <Text as="h2">{tasks.length} tasks remaining</Text>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Checkbox
              id={task.id}
              label={task.label}
              checked={task.checked}
            />
            <div>
              <Button>Edit {task.label}</Button>
              <Button>Delete {task.label}</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}