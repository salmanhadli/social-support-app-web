import React from 'react'
import Button from './components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ errorInfo })
    console.error('Uncaught error:', error, errorInfo)
  }

  handleReset = () => {
    // This will reload the page, effectively resetting the app state.
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className='flex items-center justify-center min-h-screen -mt-16'>
          <Card className='text-center'>
            <CardHeader>
              <CardTitle>Something went wrong.</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='mb-4'>
                We're sorry, but an unexpected error occurred. Please try again.
              </p>
              {import.meta.env.DEV && this.state.error && (
                <pre className='text-left bg-black/50 p-4 rounded-md overflow-auto text-sm text-red-400 max-h-60'>
                  {this.state.error.toString()}
                  <br />
                  {this.state.errorInfo?.componentStack}
                </pre>
              )}
            </CardContent>
            <div className='flex justify-center mt-4'>
              <Button onClick={this.handleReset}>Try again</Button>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
