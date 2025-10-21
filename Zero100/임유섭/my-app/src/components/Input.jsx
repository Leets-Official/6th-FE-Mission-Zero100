export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`rounded border border-gray-300 bg-white px-3 py-2 outline-none focus:border-black focus:ring-1 focus:ring-black ${className}`}
      {...props}
    />
  );
}