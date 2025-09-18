import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FieldError from '../ui/FieldError'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

export default function Step1Personal() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()

  const selectedCountry = watch('country')

  const countryPhonePrefixes = {
    EG: '+20',
    SA: '+966',
    AE: '+971',
    US: '+1',
    GB: '+44',
  }

  const fields = [
    {
      name: 'name',
      validation: {
        required: t('requiredField'),
        pattern: { value: /^[a-zA-Z\s]+$/, message: t('invalidName') },
      },
    },
    {
      name: 'nationalId',
      validation: {
        required: t('requiredField'),
        pattern: { value: /^[a-zA-Z0-9]+$/, message: t('invalidNationalId') },
        minLength: { value: 14, message: t('nationalIdLength') },
        maxLength: { value: 14, message: t('nationalIdLength') },
      },
    },
    { name: 'dob', type: 'date', validation: { required: t('requiredField') } },
    {
      name: 'gender',
      type: 'select',
      validation: { required: t('requiredField') },
      options: [
        { value: '', label: t('select') },
        { value: 'female', label: t('female') },
        { value: 'male', label: t('male') },
        { value: 'other', label: t('other') },
      ],
    },
    { name: 'address', validation: { required: t('requiredField') } },
    { name: 'city', validation: { required: t('requiredField') } },
    { name: 'state', validation: { required: t('requiredField') } },
    {
      name: 'country',
      type: 'select',
      validation: { required: t('requiredField') },
      options: [
        { value: '', label: t('select') },
        { value: 'EG', label: t('egypt') },
        { value: 'SA', label: t('saudiArabia') },
        { value: 'AE', label: t('unitedArabEmirates') },
        { value: 'US', label: t('unitedStates') },
        { value: 'GB', label: t('unitedKingdom') },
      ],
    },
    {
      name: 'phone',
      label: `${t('phone')}${countryPhonePrefixes[selectedCountry] ? ` (${countryPhonePrefixes[selectedCountry]})` : ''}`,
      validation: {
        required: t('requiredField'),
        pattern: { value: /^[0-9+-]{7,20}$/, message: t('invalidPhone') },
      },
    },
    {
      name: 'email',
      type: 'email',
      validation: {
        required: t('requiredField'),
        pattern: { value: /^\S+@\S+\.\S+$/, message: t('invalidEmail') },
      },
    },
  ]

  return (
    <div className='grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2'>
      {fields.map(({ name, type = 'text', validation, options, label }) => {
        const error = errors[name]
        return (
          <div key={name} className='block text-sm'>
            <label htmlFor={name} className='mb-1 inline-block font-medium'>
              {label || t(name)}
            </label>
            {type === 'select' ? (
              <Select
                id={name}
                {...register(name, validation)}
                error={error}
                aria-describedby={`${name}-error`}>
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
