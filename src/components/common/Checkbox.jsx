export default function Checkbox({ id, label, checked, onChange, labelClassName = '' }) {
  return (
    <label htmlFor={id} className='flex items-center gap-3'>
      <input
        id={id}
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className='w-6 h-6 border-2 border-gray-400 accent-gray-800'
      />
      <span className={labelClassName}>{label}</span>
    </label>
  );
}
