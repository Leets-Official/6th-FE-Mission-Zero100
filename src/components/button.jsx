function Button({ disabled, children, className }) {
  return (
    <button
      disabled={disabled}

      className={`w-full py-2 px-4 rounded-md font-semibold text-white bg-black hover:bg-gray-800 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;