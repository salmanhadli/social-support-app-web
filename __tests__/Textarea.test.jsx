import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Textarea } from '../src/components/ui/Textarea'

describe('Textarea Component', () => {
  it('renders a textarea element', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('applies default classes', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('w-full', 'p-2', 'border', 'rounded-md', 'bg-white/5') // baseInputClasses
    expect(textarea).toHaveClass('border-white/30', 'focus:ring-2', 'focus:ring-[var(--accent-color)]') // normalInputClasses
  })

  it('applies error classes when error prop is true', () => {
    render(<Textarea error={true} />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('border-red-400', 'focus:ring-2', 'focus:ring-red-400') // errorInputClasses
    expect(textarea).not.toHaveClass('border-white/30')
  })

  it('applies custom className', () => {
    render(<Textarea className='custom-class' />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('custom-class')
  })

  it('forwards a ref to the textarea element', () => {
    const ref = React.createRef()
    render(<Textarea ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('passes through other props to the textarea element', () => {
    render(<Textarea id='description' placeholder='Enter description' />)
    const textarea = screen.getByPlaceholderText('Enter description')
    expect(textarea).toHaveAttribute('id', 'description')
  })

  it('handles user input', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Hello world' } })
    expect(textarea.value).toBe('Hello world')
  })
})
