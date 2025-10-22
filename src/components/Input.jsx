export default function Input({ ...props }) {
    return (
        <input
            {...props}
            className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
    );
}
