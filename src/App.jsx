// src/App.jsx
import React, { useLayoutEffect, useState } from 'react'
import Wizard from './components/Wizard'
import LoadingScreen from './components/ui/LoadingScreen'
import i18n from './i18n' // <- import the instance directly
import { useTranslation } from 'react-i18next'
import { useCircularRevealTransition } from './hooks/useCircularRevealTransition'
import { Toaster, ErrorIcon } from 'react-hot-toast'
import ErrorBoundary from './ErrorBoundary'
import constants from './utils/constants'

export default function App() {
  const { i18n } = useTranslation()
  const [isInitializing, setIsInitializing] = useState(true)
  const transition = useCircularRevealTransition()
  const langToggleRef = React.useRef(null)

  useLayoutEffect(() => {
    const initializeLanguage = async () => {
      const preferredLang = localStorage.getItem(
        constants.USER_LANGUAGE_PREFERENCE
      )
      if (preferredLang && preferredLang !== i18n.language) {
        await i18n.changeLanguage(preferredLang)
        document.documentElement.dir = i18n.dir(preferredLang)
      }
      setTimeout(() => {
        setIsInitializing(false)
      }, 500)
    }
    initializeLanguage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function toggleLang(event) {
    const next = i18n.language === constants.EN ? constants.AR : constants.EN

    // Ensure i18next is initialized before changing language
    if (!i18n.isInitialized) {
      try {
        await i18n.init()
      } catch (e) {
        console.error('i18n failed to initialize', e)
        return
      }
    }

    try {
      const nextDir = next === constants.AR ? constants.RTL : constants.LTR

      // Define the DOM update logic that will be transitioned
      const updateDOM = async () => {
        await i18n.changeLanguage(next)
        localStorage.setItem(constants.USER_LANGUAGE_PREFERENCE, next) // Persist the choice in localStorage
        document.documentElement.dir = nextDir
      }

      // Trigger the transition with the animation
      await transition(event, updateDOM)
    } catch (err) {
      console.error('changeLanguage error', err)
    }
  }

  if (isInitializing) {
    return <LoadingScreen />
  }

  return (
    <div className='min-h-screen p-4'>
      <Toaster
        gutter={24}
        position='top-center'
        toastOptions={{
          duration: 5000,
          style: {
            maxWidth: '28rem',
            width: '100%',
            borderRadius: '2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)', // For Safari
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            color: 'white',
            padding: '20px 20px',
          },
          iconTheme: {
            primary: '#ef4444', // red-500
            secondary: '#ffffff',
          },
        }}
      />
      <div
        className={`flex ${
          i18n.dir() === constants.RTL ? 'justify-start' : 'justify-end'
        } mb-2`}>
        <button
          onClick={toggleLang}
          ref={langToggleRef}
          className='px-4 py-2 uppercase min-w-20 rounded-lg font-bold border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-colors'
          style={{ WebkitBackdropFilter: 'blur(10px)' }} // Fallback for some browsers
        >
          {i18n.language === constants.EN ? constants.AR : constants.EN}
        </button>
      </div>
      <ErrorBoundary>
        <Wizard />
      </ErrorBoundary>
    </div>
  )
}
