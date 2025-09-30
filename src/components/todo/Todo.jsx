export default function Todo({ id, label, checked, onToggle, onDelete }) {
  return (
    <li className='pb-6'>
      <div className='mb-4'>
        <label className='flex items-center gap-3'>
          <input
            type='checkbox'
            checked={checked}
            onChange={() => onToggle(id)}
            className='w-6 h-6 border-2 border-gray-400 accent-gray-800'
          />
          <span className={checked ? 'line-through text-gray-500' : ''}>{label}</span>
        </label>
      </div>
      <div className='flex gap-4'>
        <button className='flex-1 border-2 border-gray-400 bg-white text-gray-700 py-2'>
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className='flex-1 bg-red-600 text-white py-2 hover:bg-red-700'
        >
          Delete
        </button>
      </div>
    </li>
  );
}
