import Text from './components/Text';
import Button from './components/Button';
import Input from './components/Input';
import TodoItem from './components/TodoItem';
import Checkbox from './components/Checkbox';

// UI-only: 상태/이벤트 없이 더미 데이터로 렌더
const TASKS = ['Eat', 'Sleep', 'Repeat'];

export default function Home() {
  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: 16 }}>
      <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 24 }}>TodoMatic</h1>

      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
        What needs to be done?
      </h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Input placeholder="" />
        <Button>Add</Button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <Button>Show all tasks</Button>
        <Button>Show active tasks</Button>
        <Button>Show completed tasks</Button>
      </div>

      <Text as="h3" style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
        {TASKS.length} tasks remaining
      </Text>

      <ul style={{ listStyle: 'disc', paddingLeft: 20 }}>
        {TASKS.map((label) => (
          <TodoItem key={label} label={label} />
        ))}
      </ul>
    </div>
  );
}
