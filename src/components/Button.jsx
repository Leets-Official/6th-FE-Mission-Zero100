export default function Button({ children, variant = "primary", className = "", ...props }) {
    const base =
        "px-4 py-2 rounded-none font-medium transition-colors text-sm sm:text-base border";
    // ⬆️ rounded-none 로 네모 박스 스타일 고정

    const styles = {
        primary: `${base} bg-black text-white hover:bg-gray-800 border-black`, // Add
        secondary: `${base} bg-white text-gray-700 border-gray-400 hover:bg-gray-100`, // Category, Edit
        danger: `${base} bg-red-600 text-white border-red-600 hover:bg-red-700`, // Delete
    };

    return (
        <button {...props} className={`${styles[variant]} ${className}`}>
            {children}
        </button>
    );
}
