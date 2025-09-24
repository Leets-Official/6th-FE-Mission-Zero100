function TaskItem({ id = "default-id", label = "Sample Task", checked = false, onChange }) {
  return (
    <li>
      <label htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        {label}
      </label>
      <div>
        <button type="button">Edit {label}</button>
        <button type="button">Delete {label}</button>
      </div>
    </li>
  );
}

export default TaskItem;

