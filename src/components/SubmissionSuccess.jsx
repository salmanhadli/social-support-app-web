import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function SubmissionSuccess({ onStartNew }) {
  const { t } = useTranslation()
  const [startAnimation, setStartAnimation] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setStartAnimation(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='text-center py-12'>
      <div className='inline-block p-4 bg-[var(--accent-color)]/20 rounded-full mb-4'>
        <svg
          className='h-16 w-16'
          viewBox='0 0 52 52'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <circle
            className='text-[var(--accent-color-light)]'
            cx='26'
            cy='26'
            r='25'
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
            style={{
              strokeDasharray: 1000,
              strokeDashoffset: startAnimation ? 0 : 1000,
              transition: 'stroke-dashoffset 1s ease-in-out',
            }}
          />
          <path
            className='text-[var(--accent-color-light)]'
            stroke='currentColor'
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14 27l5.917 5.917L38.084 17'
            style={{
              strokeDasharray: 100,
              strokeDashoffset: startAnimation ? 0 : 100,
              transition: 'stroke-dashoffset 0.8s ease-in-out 0.5s',
            }}
          />
        </svg>
      </div>
      <h2
        className={`text-2xl font-bold mb-2 transition-all duration-600 ease-out delay-[800ms] ${
          startAnimation
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-5'
        }`}>
        {t('submissionSuccessTitle')}
      </h2>
      <p
        className={`text-[var(--text-secondary)] mb-8 transition-all duration-600 ease-out delay-[800ms] ${
          startAnimation
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-5'
        }`}>
        {t('submissionSuccessMessage')}
      </p>
      <button
        onClick={onStartNew}
        className={`px-6 py-2 rounded-lg bg-[var(--accent-color)] hover:bg-[var(--accent-color-dark)] transition-all duration-600 ease-out delay-[800ms] ${
          startAnimation
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-5'
        }`}>
        {t('startNewApplication')}
      </button>
    </div>
  )
}
