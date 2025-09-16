import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../src/App'
import { useTranslation } from 'react-i18next'
import { useCircularRevealTransition } from '../src/hooks/useCircularRevealTransition'
import constants from '../src/utils/constants'

// Mock custom hooks
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: jest.fn(),
}))

jest.mock('../src/hooks/useCircularRevealTransition', () => ({
  useCircularRevealTransition: jest.fn(),
}))

// Mock localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    },
    removeItem: (key) => {
      delete store[key]
    },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('App component', () => {
  let mockI18n
  let mockTransition

  beforeEach(() => {
    // Reset mocks and localStorage before each test
    jest.clearAllMocks()
    localStorageMock.clear()

    mockI18n = {
      language: constants.EN,
      dir: (lang) => (lang === constants.AR ? constants.RTL : constants.LTR),
      changeLanguage: jest.fn().mockResolvedValue(true),
      isInitialized: true,
    }

    useTranslation.mockReturnValue({ i18n: mockI18n, t: (key) => key })

    mockTransition = jest.fn().mockImplementation(async (event, callback) => {
      await callback()
    })
    useCircularRevealTransition.mockReturnValue(mockTransition)
  })

  it('shows loading screen initially', () => {
    render(<App />)
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument()
  })

  it('renders Wizard component after initialization', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByTestId('wizard')).toBeInTheDocument()
    })
    expect(screen.queryByTestId('loading-screen')).not.toBeInTheDocument()
  })

  it('initializes with language from localStorage if present', async () => {
    localStorage.setItem(constants.USER_LANGUAGE_PREFERENCE, constants.AR)
    render(<App />)

    await waitFor(() => {
      expect(mockI18n.changeLanguage).toHaveBeenCalledWith(constants.AR)
      expect(document.documentElement.dir).toBe(constants.RTL)
    })
  })

  it('toggles language from EN to AR when button is clicked', async () => {
    render(<App />)
    await waitFor(() => expect(screen.getByTestId('wizard')).toBeInTheDocument())

    // Update mock to simulate language change on re-render
    mockI18n.changeLanguage.mockImplementation(async () => {
      mockI18n.language = constants.AR
    })
    const toggleButton = screen.getByRole('button', { name: constants.AR })
    fireEvent.click(toggleButton)

    await waitFor(() => {
      expect(mockTransition).toHaveBeenCalled()
      expect(mockI18n.changeLanguage).toHaveBeenCalledWith(constants.AR)
      expect(localStorage.getItem(constants.USER_LANGUAGE_PREFERENCE)).toBe(
        constants.AR
      )
      expect(document.documentElement.dir).toBe(constants.RTL)
    })
  })
})