export default function Text({ children, as: Tag = 'p', className = '' }) {
  return <Tag className={className}>{children}</Tag>;
}
