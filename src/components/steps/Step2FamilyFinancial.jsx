import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FieldError from '../ui/FieldError'
import { Select } from '../ui/Select'
import { Input } from '../ui/Input'

export default function Step2FamilyFinancial() {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()
  
  const fields = [
    {
      name: 'maritalStatus',
      type: 'select',
      validation: { required: t('requiredField') },
      options: [
        { value: '', label: t('select') },
        { value: 'single', label: t('single') },
        { value: 'married', label: t('married') },
        { value: 'widowed', label: t('widowed') },
      ],
    },
    {
      name: 'dependents',
      type: 'number',
      validation: { required: t('requiredField') },
    },
    {
      name: 'employmentStatus',
      type: 'select',
      validation: { required: t('requiredField') },
      options: [
        { value: '', label: t('select') },
        { value: 'employed', label: t('employed') },
        { value: 'unemployed', label: t('unemployed') },
        { value: 'informal', label: t('informal') },
      ],
    },
    {
      name: 'monthlyIncome',
      type: 'number',
      validation: { required: t('requiredField') },
    },
    {
      name: 'housingStatus',
      type: 'select',
      validation: { required: t('requiredField') },
      options: [
        { value: '', label: t('select') },
        { value: 'rent', label: t('rent') },
        { value: 'own', label: t('own') },
        { value: 'homeless', label: t('homeless') },
      ],
    },
  ]

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      {fields.map(({ name, type = 'text', validation, options }) => {
        const error = errors[name]
        return (
          <div key={name} className='block text-sm'>
            <label htmlFor={name} className='mb-1 inline-block font-medium'>
              {t(name)}
            </label>
            {type === 'select' ? (
              <Select id={name} {...register(name, validation)} error={error} aria-describedby={`${name}-error`}>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            ) : (
              <Input
                id={name}
                type={type}
                {...register(name, validation)}
                error={error}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={`${name}-error`}
              />
            )}
            <FieldError id={`${name}-error`} error={error} />
          </div>
        )
      })}
    </div>
  )
}
