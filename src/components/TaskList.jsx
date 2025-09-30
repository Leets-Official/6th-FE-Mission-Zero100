import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([
    { id: "task1", label: "Eat", checked: false },
    { id: "task2", label: "Sleep", checked: false },
    { id: "task3", label: "Repeat", checked: false },
  ]);

  const handleCheckboxChange = (id) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          id={task.id}
          label={task.label}
          checked={task.checked}
          onChange={() => handleCheckboxChange(task.id)}  
        />
      ))}
    </ul>
  );
}




