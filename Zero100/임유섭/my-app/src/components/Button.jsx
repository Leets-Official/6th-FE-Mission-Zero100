export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`rounded px-4 py-2 text-sm font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}