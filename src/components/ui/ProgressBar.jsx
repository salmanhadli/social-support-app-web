import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ProgressBar({ className = '', step, steps }) {
  const { t } = useTranslation()
  let pct = Math.round(((step - 1) / (steps - 1)) * 100)
  if (pct === 0) pct = 1 // Minimum visible progress bar
  return (
    <div
      aria-hidden
      className={`w-full ${className}`}>
      <div className='h-2 bg-white/20 rounded-full'>
        <div
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)' }}
          className='h-2 rounded-full bg-green-400 transition-all duration-500'
        />
      </div>
      <div className='text-xs mt-1 text-green-200'>
        {t('step', { step, steps })}
      </div>
    </div>
  )
}
