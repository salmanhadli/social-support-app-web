// src/App.jsx
import React, { useLayoutEffect, useState } from 'react'
import Wizard from './components/Wizard'
import LoadingScreen from './components/ui/LoadingScreen'
import i18n from './i18n' // <- import the instance directly
import { useTranslation } from 'react-i18next'
import { useCircularRevealTransition } from './hooks/useCircularRevealTransition'
import ErrorBoundary from './ErrorBoundary'

export default function App() {
  const { i18n } = useTranslation()
  const [isInitializing, setIsInitializing] = useState(true)
  const transition = useCircularRevealTransition()
  const langToggleRef = React.useRef(null)

  useLayoutEffect(() => {
    const initializeLanguage = async () => {
      const preferredLang = localStorage.getItem('user-language-preference')
      if (preferredLang && preferredLang !== i18n.language) {
        await i18n.changeLanguage(preferredLang)
        document.documentElement.dir = i18n.dir(preferredLang)
      }
      setIsInitializing(false)
    }
    initializeLanguage()
  }, [])
  

  async function toggleLang(event) {
    const next = i18n.language === 'en' ? 'ar' : 'en'

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
      const nextDir = next === 'ar' ? 'rtl' : 'ltr'

      // Define the DOM update logic that will be transitioned
      const updateDOM = async () => {
        await i18n.changeLanguage(next)
        localStorage.setItem('user-language-preference', next) // Persist the choice in localStorage
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
      <div
        className={`flex ${
          i18n.dir() === 'rtl' ? 'justify-start' : 'justify-end'
        } mb-2`}>
        <button
          onClick={toggleLang}
          ref={langToggleRef}
          className='px-4 py-2 min-w-20 rounded-lg border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition-colors'
          style={{ WebkitBackdropFilter: 'blur(10px)' }} // Fallback for some browsers
        >
          {i18n.language === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>
      <ErrorBoundary>
        <Wizard />
      </ErrorBoundary>
    </div>
  )
}
