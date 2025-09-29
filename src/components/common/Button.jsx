export default function Button({ children, onClick, type = 'button', className = '' }) {
  return (
    <button type={type} onClick={onClick} className={`px-3 py-1 rounded ${className}`}>
      {children}
    </button>
  );
}
