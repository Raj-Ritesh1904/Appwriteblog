import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full flex flex-col gap-1.5'>
            {label && (
                <label 
                    className='text-sm font-semibold text-slate-300 tracking-wide pl-1' 
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-4 py-2.5 rounded-lg bg-slate-900/40 border border-slate-700/80 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 w-full text-base ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input