import Button from './Button';

const TABS = ['All', 'Active', 'Completed'];

export default function CategoryFilter({ value = 'All', onChange }) {
  return (
    <div className="mb-6 flex justify-center gap-2">
      <div className="inline-flex gap-2">
        {TABS.map((t, i) => {
          const active = value === t;
          return (
            <Button
              key={t}
              onClick={() => onChange?.(t)}
              className={[
                'w-[180px] h-11 text-sm border', // slightly larger buttons with square corners
                active ? 'border-black text-black' : 'border-gray-300 text-gray-500',
                'bg-white',
              ].join(' ')}
            >
              {t}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

