import Checkbox from './Checkbox';
import Button from './Button';
import Text from './Text';

export default function TodoItem({ label }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0' }}>
      <Checkbox />
      <Text>{label}</Text>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <Button>Edit {label}</Button>
        <Button>Delete {label}</Button>
      </div>
    </li>
  );
}
