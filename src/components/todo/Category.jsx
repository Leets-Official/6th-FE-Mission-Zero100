import Button from '../common/Button';

export default function Category({ filter, setFilter }) {
  const tab = (key, label) => (
    <Button variant={filter === key ? 'primary' : 'ghost'} onClick={() => setFilter(key)}>
      {label}
    </Button>
  );

  return (
    <div className='flex justify-center gap-3 mb-8'>
      {tab('all', 'All')}
      {tab('active', 'Active')}
      {tab('completed', 'Completed')}
    </div>
  );
}
