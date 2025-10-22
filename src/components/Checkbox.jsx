export default function Checkbox({ id, defaultChecked }) {
    return (
        <input
            id={id}
            type="checkbox"
            defaultChecked={defaultChecked}
            className='w-8 h-8 border-2 border-gray-400 accent-gray-800'
        />
    );
}
