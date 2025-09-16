import React, { useState, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import AIModal from '../ui/AIModal'
import { useTranslation } from 'react-i18next'
import SparkleIcon from '../ui/SparkleIcon'
import FieldError from '../ui/FieldError'
import Button from '../ui/Button'
import { Textarea } from '../ui/Textarea'

const FieldGroup = ({ name, label, handleHelp, helpPrompt, register, errors }) => {
  const { t } = useTranslation()
  return (
    <div className='block text-sm'>
      <div className='flex items-center justify-between'>
        <label htmlFor={name} className='mb-1 font-medium'>
          {label}
        </label>
        <Button type='button' style={{ padding: '0' }} onClick={() => handleHelp(name, helpPrompt)} variant='link' size='sm' className='mb-1'>
          <SparkleIcon className='h-6 w-6' />
          {t('helpWrite')}
        </Button>
      </div>
      <Textarea
        id={name}
        {...register(name, { required: t('requiredField') })}
        error={errors[name]}
        aria-invalid={errors[name] ? 'true' : 'false'}
        aria-describedby={`${name}-error`}
      />
      <FieldError id={`${name}-error`} error={errors[name]} />
    </div>
  )
}
export default function Step3Situation() {
  const { t } = useTranslation()
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext()

  const [modalOpen, setModalOpen] = useState(false)
  const [currentField, setFieldName] = useState(null)
  const [currentPrompt, setCurrentPrompt] = useState('')

  const handleHelp = useCallback((fieldName, examplePrompt) => {
    setFieldName(fieldName)
    setCurrentPrompt(examplePrompt)
    setModalOpen(true)
  }, [])

  const acceptSuggestion = useCallback((newText) => {
    if (currentField) setValue(currentField, newText, { shouldValidate: true })
    setModalOpen(false)
  }, [currentField, setValue])

  const fields = ['financialSituation', 'employmentCircumstances', 'reasonForApplying']

  return (
    <div className='space-y-4'>
      {fields.map((fieldName) => (
        <FieldGroup
          key={fieldName}
          name={fieldName}
          label={t(fieldName)}
          handleHelp={handleHelp}
          helpPrompt={t(`${fieldName}Help`)}
          register={register}
          errors={errors}
        />
      ))}
      <AIModal
        open={modalOpen}
        title={currentField}
        defaultPrompt={currentPrompt}
        onClose={() => setModalOpen(false)}
        onAccept={acceptSuggestion}
      />
    </div>
  )
}
