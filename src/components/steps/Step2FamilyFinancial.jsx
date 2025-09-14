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
  

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
      <div className='block text-sm'>
        <label htmlFor='maritalStatus' className='mb-1 font-medium'>{t('maritalStatus')}</label>
        <Select
          id='maritalStatus'
          {...register('maritalStatus', {
            required: t('requiredField'),
          })}
          error={errors.maritalStatus}
          aria-describedby='maritalStatus-error'>
          <option value=''>{t('select')}</option>
          <option value='single'>{t('single')}</option>
          <option value='married'>{t('married')}</option>
          <option value='widowed'>{t('widowed')}</option>
        </Select>
        <FieldError id='maritalStatus-error' error={errors.maritalStatus} />
      </div>
      <div className='block text-sm'>
        <label htmlFor='dependents' className='mb-1 font-medium'>{t('dependents')}</label>
        <Input
          id='dependents'
          type='number'
          {...register('dependents', { required: t('requiredField') })}
          error={errors.dependents}
          aria-invalid={errors.dependents ? 'true' : 'false'}
          aria-describedby='dependents-error'
        />
        <FieldError id='dependents-error' error={errors.dependents} />
      </div>
      <div className='block text-sm'>
        <label htmlFor='employmentStatus' className='mb-1 font-medium'>{t('employmentStatus')}</label>
        <Select
          id='employmentStatus'
          {...register('employmentStatus', { required: t('requiredField') })}
          error={errors.employmentStatus}
          aria-invalid={errors.employmentStatus ? 'true' : 'false'}
          aria-describedby='employmentStatus-error'>
          <option value=''>{t('select')}</option>
          <option value='employed'>{t('employed')}</option>
          <option value='unemployed'>{t('unemployed')}</option>
          <option value='informal'>{t('informal')}</option>
        </Select>
        <FieldError id='employmentStatus-error' error={errors.employmentStatus} />
      </div>
      <div className='block text-sm'>
        <label htmlFor='monthlyIncome' className='mb-1 font-medium'>{t('monthlyIncome')}</label>
        <Input
          id='monthlyIncome'
          type='number'
          {...register('monthlyIncome', { required: t('requiredField') })}
          error={errors.monthlyIncome}
          aria-invalid={errors.monthlyIncome ? 'true' : 'false'}
          aria-describedby='monthlyIncome-error'
        />
        <FieldError id='monthlyIncome-error' error={errors.monthlyIncome} />
      </div>
      <div className='block text-sm'>
        <label htmlFor='housingStatus' className='mb-1 font-medium'>{t('housingStatus')}</label>
        <Select
          id='housingStatus'
          {...register('housingStatus', { required: t('requiredField') })}
          error={errors.housingStatus}
          aria-invalid={errors.housingStatus ? 'true' : 'false'}
          aria-describedby='housingStatus-error'>
          <option value=''>{t('select')}</option>
          <option value='rent'>{t('rent')}</option>
          <option value='own'>{t('own')}</option>
          <option value='homeless'>{t('homeless')}</option>
        </Select>
        <FieldError id='housingStatus-error' error={errors.housingStatus} />
      </div>
    </div>
  )
}
