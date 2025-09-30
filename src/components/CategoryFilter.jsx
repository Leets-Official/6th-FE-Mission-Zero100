import Button from './Button';

const TABS = ['All', 'Active', 'Completed'];

export default function CategoryFilter({ value = 'All', onChange }) {
  return (
    <div className="mb-6 flex justify-center">
      <div className="inline-flex border rounded-md overflow-hidden">
        {TABS.map((t, i) => {
          const active = value === t;
          const side =
            i === 0 ? 'rounded-l-md' : i === TABS.length - 1 ? 'rounded-r-md' : '';
          return (
            <Button
              key={t}
              onClick={() => onChange?.(t)}
              className={[
                'px-6 h-10 text-sm border-r last:border-r-0', // 구분선
                side,
                active ? 'bg-black text-white' : 'bg-white',
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

