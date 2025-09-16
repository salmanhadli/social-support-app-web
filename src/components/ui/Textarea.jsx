import React from 'react'

const baseInputClasses =
  'w-full p-2 min-h-15 border rounded-md bg-white/5 placeholder-[var(--text-secondary)] focus:border-transparent outline-none transition min-h-10 field-sizing-content'
const normalInputClasses = 'border-white/30 focus:ring-2 focus:ring-[var(--accent-color)]'
const errorInputClasses = 'border-red-400 focus:ring-2 focus:ring-red-400'

const Textarea = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <textarea
      className={`${baseInputClasses} ${error ? errorInputClasses : normalInputClasses} ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }