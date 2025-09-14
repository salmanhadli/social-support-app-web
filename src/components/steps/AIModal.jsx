import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SparkleIcon from './SparkleIcon'
import useChatCompletion from '../hooks/useChatCompletion'
import Spinner from '../ui/Spinner'
import { Button } from './Button'

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

  // // Reset local state when a new suggestion is passed in
  // useEffect(() => {
  //   setPrompt(suggestion)
  // }, [suggestion])

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


  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: `translate(-${i18n.dir() === 'rtl' ? '100%' : '50%'}, -50%)`,
      }}
      className='w-full max-w-2xl bg-black/20 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg text-white p-6 backdrop:bg-black/50 backdrop:backdrop-blur-sm'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-xl font-semibold'>{t('aiSuggestionTitle')}: {title}</h3>
        <Button
          onClick={onClose}
          type='button'
          variant='ghost'
          size='icon'
          aria-label={t('discard')}>
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
        </Button>
      </div>

      <div className='space-y-4'>
        <div>
          <label
            id='ai-prompt'
            className='block text-sm font-medium text-green-200'>
            {t('prompt')}
            <textarea
              htmlFor='ai-prompt'
              name='ai-prompt'
              className='w-full min-h-10 field-sizing-content h-auto mt-1 p-2 border rounded-md bg-white/10 border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </label>
          <div className='flex justify-end mt-2'>
            <Button
              type='button'
              onClick={generate}
              disabled={loading}
              size='sm'
              className='gap-2 min-w-[120px]'>
              {loading ? <Spinner /> : <SparkleIcon className='w-4 h-4' />}
              {loading ? t('generating') : t('generate')}
            </Button>
          </div>
        </div>
        <div>
          <label
            htmlFor='ai-response'
            className='block text-sm font-medium text-green-200'>
            {t('response')}
          </label>
          <div className='relative'>
            <textarea
              id='ai-response'
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              disabled={loading}
              className='w-full min-h-40 field-sizing-content h-auto mt-1 p-2 border rounded-md bg-white/10 border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition disabled:opacity-50'
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
        <Button
          type='button'
          onClick={handleDiscard}
          disabled={loading}
          variant='secondary'>
          {t('discard')}
        </Button>
        <Button
          type='button'
          onClick={handleAccept}
          disabled={loading || !response}>
          {t('accept')}
        </Button>
      </div>
    </dialog>
  )
}
