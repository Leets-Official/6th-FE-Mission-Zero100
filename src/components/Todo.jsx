import Checkbox from "./Checkbox";
import Button from "./Button";

export default function Todo({ id, label, completed, onDelete, onToggle }) {
    return (
        <li className="py-3">
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

            <div className="flex gap-2">
                <Button variant="secondary" className="flex-1 border border-gray-400 text-gray-800">
                    Edit
                </Button>
                <Button variant="danger" className="flex-1" onClick={onDelete}>
                    Delete
                </Button>
            </div>
        </li>
    );
}
