export default function Input({ placeholder, className, value, onChange, ...rest }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}

