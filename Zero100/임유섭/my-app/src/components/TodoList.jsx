import { useState } from "react";

function Item({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.label);

  const save = () => {
    const v = text.trim();
    if (!v) return;
    onEdit?.(task.id, v);
    setEditing(false);
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={task.checked}
        onChange={() => onToggle?.(task.id)}
      />
      {editing ? (
        <>
          <input
            type="text"
            value={text}
            onChange={(e)=>setText(e.target.value)}
            onKeyDown={(e)=> e.key==='Enter' && save()}
          />
          <button className="icon-btn" onClick={save}>저장</button>
          <button className="icon-btn" onClick={()=>{setText(task.label);setEditing(false);}}>취소</button>
        </>
      ) : (
        <>
          <label style={{textDecoration: task.checked?'line-through':'none'}}>
            {task.label}
          </label>
          <button className="icon-btn" onClick={()=>setEditing(true)}>수정</button>
          <button className="icon-btn" onClick={()=>onDelete?.(task.id)}>삭제</button>
        </>
      )}
    </li>
  );
}

export default function TodoList({ tasks, onToggle, onDelete, onEdit }) {
  if (!tasks?.length) return <p style={{marginTop:10}}>항목이 없습니다.</p>;
  return (
    <ul className="todo-list">
      {tasks.map((t)=>(
        <Item
          key={t.id}
          task={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}