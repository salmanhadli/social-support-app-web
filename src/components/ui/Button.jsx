import React from 'react'

const buttonVariants = {
  variant: {
    primary: 'bg-[var(--accent-color)] text-white hover:bg-[var(--accent-color-dark)] disabled:bg-[var(--accent-color-darker)]',
    secondary:
      'border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20',
    ghost: 'hover:bg-white/20 transition-colors',
    link: 'text-[var(--accent-color-light)] hover:text-[var(--accent-color)] underline',
  },
  size: {
    default: 'px-6 py-2',
    sm: 'px-4 py-2 text-sm',
    icon: 'p-1 rounded-full',
  },
}

const Button = React.forwardRef(
  ({ className, variant = 'primary', size = 'default', ...props }, ref) => {
    const classes = `inline-flex items-center justify-center rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${buttonVariants.variant[variant]} ${buttonVariants.size[size]} ${className}`
    return <button className={classes} ref={ref} {...props} />
  }
)

Button.displayName = 'Button'

export default Button