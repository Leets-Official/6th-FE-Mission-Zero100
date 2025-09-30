export default function Button({ children, className, type = 'button' }) {
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
} 