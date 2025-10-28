// src/components/todo/TodoList.jsx
import { useState } from 'react';
import Text from '../Text';          // 경로는 프로젝트 구조에 맞게 조정
import Button from '../Button';
import Input from '../Input';
import Checkbox from '../Checkbox';

// 개별 항목(편집 상태를 항목 컴포넌트 내부에서 관리)
function Row({ id, label, checked, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(label);

  const handleSave = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    onEdit(id, trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewName(label);   // 원래 값으로 되돌림
    setIsEditing(false);
  };

  return (
    <li className="pb-6 border-b border-gray-200">
      {/* 체크박스 + 라벨 */}
      <div className="mb-3 flex items-center gap-3">
        <Checkbox checked={checked} onChange={() => onToggle(id)} />
        {!isEditing ? (
          <span className={checked ? 'line-through text-gray-500' : 'text-gray-800'}>
            {label}
          </span>
        ) : (
          <span className="text-sm text-gray-600">{`New name for ${label}`}</span>
        )}
      </div>

      {/* 편집 중일 때 입력창 */}
      {isEditing && (
        <div className="mb-3">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={`New name for ${label}`}
            className="border-gray-400"
          />
        </div>
      )}

      {/* 버튼 영역 */}
      <div className="flex gap-4">
        {!isEditing ? (
          <>
            {/* Edit / Delete (각각 가로 꽉 차도록) */}
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              onClick={() => onDelete(id)}
            >
              Delete
            </Button>
          </>
        ) : (
          <>
            {/* Cancel / Save (각각 가로 꽉 차도록) */}
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleSave}
            >
              Save
            </Button>
          </>
        )}
      </div>
    </li>
  );
}

export default function TodoList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <section className="w-full">
      <Text as="h2" className="text-2xl font-semibold text-gray-700 mb-6">
        {/* 헤더 컴포넌트가 개수 보여주면 생략 가능 */}
      </Text>

      <ul className="space-y-6">
        {tasks.map((t) => (
          <Row
            key={t.id}
            id={t.id}
            label={t.label}
            checked={t.checked}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </section>
  );
}