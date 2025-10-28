export default function Input({ name, placeholder, value, onChange, className = '', ...props }) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
      className={`w-full px-3 py-2 border-2 border-gray-400 rounded-none focus:outline-none focus:ring-2 focus:ring-black ${className}`}
    />
  );
}
