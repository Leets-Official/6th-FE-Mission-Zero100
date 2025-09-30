export default function Checkbox({ id, defaultChecked }) {
    return (
        <input
            id={id}
            type="checkbox"
            defaultChecked={defaultChecked}
            className="h-4 w-4 border-gray-400 text-black focus:ring-black"
        />
    );
}
