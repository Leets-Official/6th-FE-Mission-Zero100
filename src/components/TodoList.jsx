import Text from './Text';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <section className="mt-16">
      <Text className="text-[32px] font-bold mb-12">{remaining} tasks remaining</Text>

      {todos.length === 0 ? null : (
        <ul className="space-y-8">
          {todos.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
