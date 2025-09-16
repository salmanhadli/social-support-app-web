import React from 'react'

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`max-w-3xl px-3 mx-auto p-6 md:p-8 bg-black/30 backdrop-blur-md rounded-2xl border-white/20 shadow-lg ${className}`}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`mb-4 ${className}`} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={`text-3xl font-bold ${className}`}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`mt-8 ${className}`} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex gap-4 mt-8 justify-end ${className}`}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardContent, CardFooter }