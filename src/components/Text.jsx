export default function Text({ as: Tag = 'span', children, className }) {
  return <Tag className={className}>{children}</Tag>;
}

