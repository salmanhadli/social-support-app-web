import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './SubmissionSuccess.css'

export default function SubmissionSuccess({ onStartNew }) {
  const { t } = useTranslation()
  const [startAnimation, setStartAnimation] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setStartAnimation(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`text-center py-12 ${startAnimation ? 'success-animation' : ''}`}>
      <div className='inline-block p-4 bg-green-500/20 rounded-full mb-4'>
        <svg
          className="h-16 w-16"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="circle text-green-400"
            cx="26"
            cy="26"
            r="25"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            className="check text-green-400"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap='round'
            strokeLinejoin='round'
            d="M14 27l5.917 5.917L38.084 17"
          />
        </svg>
      </div>
      <h2 className='text-2xl font-bold text-white mb-2 fade-in-up'>{t('submissionSuccessTitle')}</h2>
      <p className='text-gray-300 mb-8 fade-in-up'>{t('submissionSuccessMessage')}</p>
      <button
        onClick={onStartNew}
        className='px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors fade-in-up'>
        {t('startNewApplication')}
      </button>
    </div>
  )
}