import { useState } from "react";

export default function AddTodo({ onAdd }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const name = value.trim();
    if (!name) return;
    onAdd?.(name);
    setValue("");
  };

  return (
    <form className="row" onSubmit={submit} style={{marginBottom:8}}>
      <input
        className="input flex1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button className="btn small" type="submit">추가</button>
    </form>
  );
}