import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SparkleIcon from './SparkleIcon'
import useChatCompletion from "../../hooks/useChatCompletion"
import Spinner from '../ui/Spinner'
import { Textarea } from './Textarea'

function camelCaseToTitle(camelCase) {
  if (!camelCase) return ''
  const result = camelCase.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export default function AIModal({
  open,
  onClose,
  title,
  defaultPrompt,
  onAccept,
}) {
  const { t, i18n } = useTranslation()
  const dialogRef = useRef(null)
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const { loading, getCompletion } = useChatCompletion()
  
  // Sync dialog state with the `open` prop
  useEffect(() => {
    const dialogNode = dialogRef.current
    if (open) {
      dialogNode?.showModal()
      setPrompt(defaultPrompt || '')
    } else {
      dialogNode?.close()
      setPrompt('')
      setResponse('')
    }
  }, [open])

  const generate = async () => {
    const text = await getCompletion(prompt)
    setResponse(text)
  }

  const handleAccept = () => {
    onAccept(response)
  }

  const handleDiscard = () => {
    setResponse('')
  }

  const formattedTitle = camelCaseToTitle(title)


  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: `translate(-${i18n.dir() === 'rtl' ? '75%' : '50%'}, -50%)`,
      }}
      className='w-full max-w-2xl backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-6 backdrop:bg-black/50 backdrop:backdrop-blur-sm'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-xl font-semibold'>{t('aiSuggestionTitle')}: {formattedTitle}</h3>
        <button
          onClick={onClose}
          type='button'
          className='p-1 rounded-full hover:bg-white/20 transition-colors'
          aria-label={t('close')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>

      <div className='space-y-4'>
        <div>
          <label
            htmlFor='ai-prompt'
            className='inline-block mb-1 text-sm font-medium text-[var(--accent-color-light)]'>
            {t('prompt')}
          </label>
          <Textarea
            id='ai-prompt'
            className='min-h-10 h-auto mt-1 p-2'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className='flex justify-end mt-2'>
            <button
              type='button'
              onClick={generate}
              disabled={loading}
              className='inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-color)] text-white hover:bg-[var(--accent-color-dark)] transition-colors disabled:bg-[var(--accent-color-darker)] disabled:cursor-not-allowed min-w-[120px]'>
              {loading ? <Spinner /> : <SparkleIcon className='w-4 h-4' />}
              {loading ? t('generating') : t('generate')}
            </button>
          </div>
        </div>
        <div>
          <label
            htmlFor='ai-response'
            className='block text-sm font-medium text-[var(--accent-color-light)]'>
            {t('response')}
          </label>
          <div className='relative'>
            <Textarea
              id='ai-response'
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              disabled={loading}
              className='min-h-40 h-auto mt-1 p-2 disabled:opacity-50'
              aria-label={t('response')}
            />
            {loading && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/20 rounded-md'>
                <Spinner />
                <span className='ml-2'>{t('generating')}...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mt-6 flex gap-4 justify-end'>
        <button
          type='button'
          onClick={handleDiscard}
          disabled={loading}
          className='px-6 py-2 rounded-lg border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors disabled:opacity-50'>
          {t('discard')}
        </button>
        <button
          type='button'
          onClick={handleAccept}
          disabled={loading || !response}
          className='px-6 py-2 rounded-lg bg-[var(--accent-color)] text-white hover:bg-[var(--accent-color-dark)] transition-colors disabled:bg-[var(--accent-color-darker)] disabled:cursor-not-allowed'>
          {t('accept')}
        </button>
      </div>
    </dialog>
  )
}
