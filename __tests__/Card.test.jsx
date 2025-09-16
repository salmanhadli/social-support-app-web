import React from 'react'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../src/components/ui/Card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with children and custom className', () => {
      render(
        <Card className='custom-card'>
          <div>Child Content</div>
        </Card>
      )
      const card = screen.getByText('Child Content').parentElement
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('custom-card')
      expect(card).toHaveClass('max-w-3xl', 'bg-black/30', 'rounded-2xl')
    })

    it('forwards a ref', () => {
      const ref = React.createRef()
      render(<Card ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('CardHeader', () => {
    it('renders with children and custom className', () => {
      render(<CardHeader className='custom-header'>Header</CardHeader>)
      const header = screen.getByText('Header')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('custom-header')
      expect(header).toHaveClass('mb-4')
    })

    it('forwards a ref', () => {
      const ref = React.createRef()
      render(<CardHeader ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('CardTitle', () => {
    it('renders an h1 with children and custom className', () => {
      render(<CardTitle className='custom-title'>Title</CardTitle>)
      const title = screen.getByRole('heading', { level: 1, name: 'Title' })
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass('custom-title')
      expect(title).toHaveClass('text-3xl', 'font-bold')
    })

    it('forwards a ref', () => {
      const ref = React.createRef()
      render(<CardTitle ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
    })
  })

  describe('CardContent', () => {
    it('renders with children and custom className', () => {
      render(<CardContent className='custom-content'>Content</CardContent>)
      const content = screen.getByText('Content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveClass('custom-content')
      expect(content).toHaveClass('mt-8')
    })

    it('forwards a ref', () => {
      const ref = React.createRef()
      render(<CardContent ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('CardFooter', () => {
    it('renders with children and custom className', () => {
      render(<CardFooter className='custom-footer'>Footer</CardFooter>)
      const footer = screen.getByText('Footer')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('custom-footer')
      expect(footer).toHaveClass('flex', 'gap-4', 'mt-8', 'justify-end')
    })

    it('forwards a ref', () => {
      const ref = React.createRef()
      render(<CardFooter ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })
})
