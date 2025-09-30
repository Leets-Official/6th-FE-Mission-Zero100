//입력 영역(할 일 추가)
function AddTodo({ value, onChange, placeholder = "" }) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='w-full border-2 border-gray-400 p-3'
      />
      <button type="button" className='w-full bg-black text-white rounded-none py-3 mt-3'>Add</button>
    </div>
  );
}

export default AddTodo;


