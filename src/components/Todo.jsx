import { useState } from "react";
import Checkbox from "./Checkbox";
import Button from "./Button";
import Input from "./Input";

//  Todo 컴포넌트
//  한 개의 할 일을 표시하고, 완료/삭제/수정 기능을 담당
export default function Todo({ id, label, completed, onDelete, onToggle, onEdit }) {
    //  수정 모드 상태 (Edit 클릭 시 true)
    const [isEditing, setIsEditing] = useState(false);

    // 수정 중인 이름을 저장하는 상태
    const [newName, setNewName] = useState(label);

    //  Save 버튼 클릭 시 — 이름 변경 후 수정 모드 종료
    const handleSave = () => {
        if (newName.trim() === "") return;
        onEdit(newName); // 부모(TodoList)에게 새 이름 전달
        setIsEditing(false); // 수정 모드 종료
    };

    //  Cancel 버튼 클릭 시 — 변경 취소 후 원래 상태 복귀
    const handleCancel = () => {
        setNewName(label); // 입력값 초기화
        setIsEditing(false); // 수정 모드 종료
    };

    return (
        <li className="py-3">
            {isEditing ? (
                //  수정 모드 화면
                <div>
                    {/*  New name  입력창 */}
                    <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder={`New name for ${label}`}
                    />

                    {/*  Cancel / Save 버튼 */}
                    <div className="flex gap-2 mt-2">
                        <Button
                            variant="secondary"
                            className="flex-1 border border-gray-400 text-gray-800"
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
                    </div>
                </div>
            ) : (
                //  기본 모드 화면
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        {/*  checked 속성으로 상태 반영 */}
                        <Checkbox id={id} checked={completed} onChange={onToggle} />

                        {/*  완료 시 회색 + 취소선 */}
                        <label
                            htmlFor={id}
                            className={`text-gray-800 ${
                                completed ? "line-through text-gray-400" : ""
                            }`}
                        >
                            {label}
                        </label>
                    </div>

                    {/*  Edit / Delete 버튼 */}
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            className="flex-1 border border-gray-400 text-gray-800"
                            onClick={() => setIsEditing(true)} // Edit 클릭 시 수정 모드로 전환
                        >
                            Edit
                        </Button>
                        <Button
                            variant="danger"
                            className="flex-1"
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            )}
        </li>
    );
}
