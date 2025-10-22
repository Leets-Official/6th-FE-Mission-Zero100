export default function Text({ as: Tag = "p", children, className = "", ...props }) {
    return (
        <Tag {...props} className={`text-gray-800 ${className}`}>
            {children}
        </Tag>
    );
}
