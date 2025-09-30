function Todo({ id, label, checked, onToggle }) {
  return (
    <li className="mb-4">
      {/* 체크박스 + 라벨 */}
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(id)}
          className="h-5 w-5 accent-black"
        />
        <label htmlFor={id}>{label}</label>
      </div>

      {/* 버튼은 라벨 밑에 */}
      <div className="mt-2 flex gap-2">
        <button className="w-full h-9 rounded border border-gray-300 text-sm">
          Edit
        </button>
        <button className="w-full h-9 rounded bg-red-600 text-sm text-white font-medium">
          Delete
        </button>
      </div>
    </li>
  );
}

export default Todo;
