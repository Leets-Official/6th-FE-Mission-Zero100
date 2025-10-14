const Input = ({ name, placeholder, className, value, onChange}) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black ${className}`}
    />
  );
};

export default Input;