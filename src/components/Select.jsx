import React, {useId} from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full flex flex-col gap-1.5'>
        {label && (
            <label 
                htmlFor={id} 
                className='text-sm font-semibold text-slate-300 tracking-wide pl-1'
            >
                {label}
            </label>
        )}
        <select
            {...props}
            id={id}
            ref={ref}
            className={`px-4 py-2.5 rounded-lg bg-slate-900/40 border border-slate-700/80 text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 w-full text-base cursor-pointer ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option} className="bg-slate-800 text-white">
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)