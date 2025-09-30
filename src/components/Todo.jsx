import Checkbox from "./Checkbox";
import Button from "./Button";

export default function Todo({ id, label, defaultChecked }) {
    return (
        <li className="py-3 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-2">
                <Checkbox id={id} defaultChecked={defaultChecked} />
                <label htmlFor={id} className="text-gray-800">
                    {label}
                </label>
            </div>
            {/* 버튼을 Edit / Delete로 반반 차지 */}
            <div className="flex gap-2">
                <Button variant="secondary" className="flex-1">
                    Edit
                </Button>
                <Button variant="danger" className="flex-1">
                    Delete
                </Button>
            </div>
        </li>
    );
}
