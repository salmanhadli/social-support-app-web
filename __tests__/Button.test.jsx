import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../src/components/ui/Button'

describe('Button Component', () => {
  it('renders a button element with children', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('applies default primary variant and default size classes', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-[var(--accent-color)]') // from primary variant
    expect(button).toHaveClass('px-6 py-2') // from default size
  })

  it('applies secondary variant classes', () => {
    render(<Button variant='secondary'>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border-white/30 bg-white/10')
  })

  it('applies ghost variant classes', () => {
    render(<Button variant='ghost'>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('hover:bg-white/20')
  })

  it('applies link variant classes', () => {
    render(<Button variant='link'>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('text-[var(--accent-color-light)]', 'underline')
  })

  it('applies small size classes', () => {
    render(<Button size='sm'>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('px-4 py-2 text-sm')
  })

  it('applies icon size classes', () => {
    render(<Button size='icon'>Icon</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('p-1 rounded-full')
  })

  it('applies custom className', () => {
    render(<Button className='custom-class'>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('handles onClick events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when the disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50 disabled:cursor-not-allowed')
  })

  it('forwards a ref to the button element', () => {
    const ref = React.createRef()
    render(<Button ref={ref}>Click me</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
