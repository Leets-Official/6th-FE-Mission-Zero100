function TaskInput({ value, onChange, placeholder = "" }) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button type="button">Add</button>
    </div>
  );
}

export default TaskInput;


