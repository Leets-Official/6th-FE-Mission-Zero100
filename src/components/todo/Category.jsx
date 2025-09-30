export default function Category({ filter, setFilter }) {
  const base = 'w-28 border-2 rounded-none py-2 text-gray-700 bg-white';
  const active = 'border-gray-600';
  const inactive = 'border-gray-300';

  return (
    <div className='flex justify-center gap-4 mb-8'>
      <button
        onClick={() => setFilter('all')}
        className={`${base} ${filter === 'all' ? active : inactive}`}
      >
        All
      </button>
      <button
        onClick={() => setFilter('active')}
        className={`${base} ${filter === 'active' ? active : inactive}`}
      >
        Active
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={`${base} ${filter === 'completed' ? active : inactive}`}
      >
        Completed
      </button>
    </div>
  );
}
