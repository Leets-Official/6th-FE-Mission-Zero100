function Button({ disabled, children, className, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full py-2 px-4 font-semibold text-white bg-black hover:bg-gray-800 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;