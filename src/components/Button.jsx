export default function Button({
    children,
    type = "button",
    bgColor = "bg-indigo-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button 
            type={type}
            className={`px-5 py-2.5 rounded-lg font-semibold cursor-pointer active:scale-[0.98] transition-all duration-250 shadow-md ${bgColor} hover:brightness-110 active:brightness-95 hover:shadow-lg ${textColor} ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
}