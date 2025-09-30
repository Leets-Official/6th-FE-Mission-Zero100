import Todo from './Todo';

export default function TodoList({ count, tasks, onToggle, onDelete }) {
  return (
    <section>
      <h2 className='text-2xl font-semibold text-gray-700 mb-6'>{count} tasks remaining</h2>
      <ul className='space-y-6'>
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
