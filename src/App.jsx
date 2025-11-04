import TodoContaier from './containers/TodoContainer';

export default function App() {
  return (
    <div className='min-h-screen bg-gray-100 flex justify-center py-14'>
      <div className='w-[600px] bg-white rounded-sm p-10 shadow-[var(--shadow-card)]'>
        <TodoContaier />
      </div>
    </div>
  );
}
