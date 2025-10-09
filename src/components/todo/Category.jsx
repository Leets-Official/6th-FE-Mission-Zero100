// src/components/todo/Category.jsx
import Button from '../common/Button';

export default function Category({ filter, setFilter }) {
  const base = 'w-28 py-2 border-2 rounded-none font-medium';
  const active = 'border-black';
  const inactive = 'border-gray-300 text-gray-600';

  return (
    <div className='flex justify-center gap-4 mb-8'>
      {['all', 'active', 'completed'].map((key) => (
        <Button
          key={key}
          onClick={() => setFilter(key)}
          variant='outline'
          className={`${base} ${filter === key ? active : inactive}`}
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </Button>
      ))}
    </div>
  );
}
