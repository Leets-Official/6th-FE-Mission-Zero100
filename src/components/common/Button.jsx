export default function Button({ children, variant = 'default', className = '', ...props }) {
  const base =
    'w-full py-3 font-semibold border-2 rounded-none text-center transition-colors duration-200';

  const variants = {
    default: 'border-gray-400 text-gray-700 bg-white hover:bg-gray-100',
    primary: 'bg-black text-white border-black hover:bg-gray-800', // Add 버튼
    outline: 'border-gray-400 text-gray-700 bg-white hover:bg-gray-100', // Edit, Category
    danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700', // Delete 버튼
  };

  return (
    <button {...props} className={`${base} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </button>
  );
}
