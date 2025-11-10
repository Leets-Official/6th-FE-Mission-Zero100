export default function Input({ className, ...props }) { //  className 프롭스를 명시적으로 분리
    const baseStyles = "w-full border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black";
    const combinedClassName = `${baseStyles} ${className}`;

    return (
        <input
            {...props}

            className={combinedClassName}
        />
    );
}