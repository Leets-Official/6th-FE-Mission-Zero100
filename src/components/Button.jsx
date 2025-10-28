export default function Button({ children, className, type = 'button', onClick, ...rest }) {
  return (
    <button type={type} className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
