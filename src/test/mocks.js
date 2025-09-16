import React from 'react'

// Mock hooks with external dependencies that cause issues in Jest (e.g., use Vite-specific syntax)
jest.mock('../hooks/useChatCompletion', () => ({
  __esModule: true,
  default: () => ({
    loading: false,
    error: null,
    getCompletion: jest.fn().mockResolvedValue('mocked AI response'),
  }),
}))

// Mock child components to isolate the component under test
jest.mock('../components/Wizard', () => ({
  __esModule: true,
  default: () => <div data-testid='wizard'>Wizard Component</div>,
}))

jest.mock('../components/ui/LoadingScreen', () => ({
  __esModule: true,
  default: () => <div data-testid='loading-screen'>Loading...</div>,
}))