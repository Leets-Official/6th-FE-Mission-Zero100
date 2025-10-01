export default function Checkbox({ className = '', ...props }) {
  return <input type="checkbox" className={`h-5 w-5 accent-black ${className}`} {...props} />;
}
