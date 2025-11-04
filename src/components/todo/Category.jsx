import Button from '../common/Button';

export default function Category({ filter, setFilter }) {
  const base = 'w-28 py-2 border-2 rounded-none font-medium';
  const active = '!border-black underline underline-offset-4 decoration-2';
  const inactive = 'border-gray-300 text-gray-600';

  const categories = ['all', 'active', 'completed'];

  return (
    <div className='flex justify-center gap-4 mb-8'>
      {categories.map((key) => (
        <Button
          key={key}
          onClick={() => setFilter(key)}
          className={`${base} ${filter === key ? active : inactive}`}
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </Button>
      ))}
    </div>
  );
}
