import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Select } from '../src/components/ui/Select'

describe('Select Component', () => {
  it('renders a select element', () => {
    render(<Select data-testid='select' />)
    const select = screen.getByTestId('select')
    expect(select).toBeInTheDocument()
    expect(select.tagName).toBe('SELECT')
  })

  it('applies default classes', () => {
    render(<Select data-testid='select' />)
    const select = screen.getByTestId('select')
    expect(select).toHaveClass('w-full', 'p-2', 'border', 'rounded-md', 'bg-white/5') // baseInputClasses
    expect(select).toHaveClass('border-white/30', 'focus:ring-2', 'focus:ring-[var(--accent-color)]') // normalInputClasses
  })

  it('applies error classes when error prop is true', () => {
    render(<Select error={true} data-testid='select' />)
    const select = screen.getByTestId('select')
    expect(select).toHaveClass('border-red-400', 'focus:ring-2', 'focus:ring-red-400') // errorInputClasses
    expect(select).not.toHaveClass('border-white/30')
  })

  it('applies custom className', () => {
    render(<Select className='custom-class' data-testid='select' />)
    const select = screen.getByTestId('select')
    expect(select).toHaveClass('custom-class')
  })

  it('forwards a ref to the select element', () => {
    const ref = React.createRef()
    render(<Select ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLSelectElement)
  })

  it('renders children options', () => {
    render(
      <Select>
        <option value='1'>Option 1</option>
        <option value='2'>Option 2</option>
      </Select>
    )
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument()
  })

  it('handles user selection', () => {
    render(
      <Select data-testid='select'>
        <option value='1'>Option 1</option>
        <option value='2'>Option 2</option>
      </Select>
    )
    const select = screen.getByTestId('select')
    fireEvent.change(select, { target: { value: '2' } })
    expect(select.value).toBe('2')
  })
})
