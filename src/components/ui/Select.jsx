import React from 'react'

const baseInputClasses =
  'w-full p-2 border rounded-md bg-white/10 text-white placeholder-gray-300 focus:border-transparent outline-none transition'
const normalInputClasses = 'border-white/30 focus:ring-2 focus:ring-green-400'
const errorInputClasses = 'border-red-400 focus:ring-2 focus:ring-red-400'

const Select = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <select
      className={`${baseInputClasses} ${error ? errorInputClasses : normalInputClasses} ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Select.displayName = 'Select'

export { Select }