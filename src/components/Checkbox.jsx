export default function Checkbox({ id, checked, onChange }) {
    return (
        <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="w-6 h-6 border-2 border-gray-400 accent-gray-800"
        />
    );
}
