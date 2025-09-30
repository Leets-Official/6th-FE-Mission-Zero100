import Text from './Text';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <section className="bg-white rounded-2xl shadow p-6">
      <Text className="text-xl font-semibold mb-4">
        {remaining} tasks remaining
      </Text>

      {todos.length === 0 ? (
        <Text className="text-sm text-gray-500">No tasks yet. Add one above!</Text>
      ) : (
        <ul className="space-y-3">
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
