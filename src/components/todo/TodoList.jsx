import Text from '../common/Text';
import Todo from './Todo';

export default function TodoList({ count, tasks, onToggle, onDelete }) {
  return (
    <section className='w-full'>
      <Text as='h2' className='text-2xl font-semibold text-gray-700 mb-6'>
        {count} tasks remaining
      </Text>
      <ul className='w-full space-y-6'>
        {tasks.map((t) => (
          <Todo
            key={t.id}
            id={t.id}
            label={t.label}
            checked={t.checked}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
