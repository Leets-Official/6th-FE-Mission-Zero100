import Checkbox from "./Checkbox";
import Button from "./Button";

//  개별 할 일 항목 표시 및 조작
export default function Todo({ id, label, defaultChecked, onDelete, onToggle }) {
    return (
        <li className="py-3">
            <div className="flex items-center gap-2 mb-2">
                {/* 체크박스 클릭 시 완료 상태 토글 */}
                <Checkbox id={id} defaultChecked={defaultChecked} onChange={onToggle} />
                <label htmlFor={id} className="text-gray-800">
                    {label}
                </label>
            </div>

            {/* Edit / Delete 버튼 */}
            <div className="flex gap-2">
                <Button variant="secondary" className="flex-1">
                    Edit
                </Button>
                <Button
                    variant="danger"
                    className="flex-1"
                    onClick={onDelete} //  삭제 버튼에 이벤트 연결
                >
                    Delete
                </Button>
            </div>
        </li>
    );
}
