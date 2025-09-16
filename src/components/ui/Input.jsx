import React from 'react'

const baseInputClasses =
  'w-full p-2 border rounded-md bg-white/5 placeholder-[var(--text-secondary)] focus:border-transparent outline-none transition'
const normalInputClasses = 'border-white/30 focus:ring-2 focus:ring-[var(--accent-color)]'
const errorInputClasses = 'border-red-400 focus:ring-2 focus:ring-red-400'

const Input = React.forwardRef(
  ({ className = '', type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`${baseInputClasses} ${error ? errorInputClasses : normalInputClasses} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }