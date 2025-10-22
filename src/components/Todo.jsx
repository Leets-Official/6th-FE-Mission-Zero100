import Checkbox from "./Checkbox";
import Button from "./Button";

export default function Todo({ id, label, defaultChecked }) {
    return (
        <li className="py-3">
            <div className="flex items-center gap-2 mb-2">
                <Checkbox id={id} defaultChecked={defaultChecked} />
                <label htmlFor={id} className="text-gray-800">
                    {label}
                </label>
            </div>
            <div className="flex gap-2">
                <Button
                    variant="secondary"
                    className="flex-1 border border-gray-400 text-gray-800"
                >
                    Edit
                </Button>
                <Button variant="danger" className="flex-1">
                    Delete
                </Button>
            </div>

        </li>

    );
}
