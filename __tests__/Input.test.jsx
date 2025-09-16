import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input } from '../src/components/ui/Input'

describe('Input Component', () => {
  it('renders an input element', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('applies default classes', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('w-full', 'p-2', 'border', 'rounded-md', 'bg-white/5') // baseInputClasses
    expect(input).toHaveClass('border-white/30', 'focus:ring-2', 'focus:ring-[var(--accent-color)]') // normalInputClasses
  })

  it('applies error classes when error prop is true', () => {
    render(<Input error={true} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-400', 'focus:ring-2', 'focus:ring-red-400') // errorInputClasses
    expect(input).not.toHaveClass('border-white/30')
  })

  it('applies custom className', () => {
    render(<Input className='custom-class' />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-class')
  })

  it('forwards a ref to the input element', () => {
    const ref = React.createRef()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('passes through other props to the input element', () => {
    render(<Input type='email' id='email-input' placeholder='Enter email' />)
    const input = screen.getByPlaceholderText('Enter email')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('id', 'email-input')
  })
})
