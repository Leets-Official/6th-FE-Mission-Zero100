export default function Checkbox({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className='flex items-center gap-2 cursor-pointer'>
      <input id={id} type='checkbox' checked={checked} onChange={onChange} className='w-5 h-5' />
      {label}
    </label>
  );
}
