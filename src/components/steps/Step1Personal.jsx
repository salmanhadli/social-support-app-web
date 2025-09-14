import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FieldError from '../ui/FieldError'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

export default function Step1Personal() {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()

  return (
    <div className='grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2'>
      <div className='block text-sm'>
        <label htmlFor='name' className='mb-1 font-medium'>{t('name')}</label>
        <Input
          id='name'
          {...register('name', {
            required: t('requiredField'),
            pattern: { value: /^[a-zA-Z]+$/, message: t('invalidName') },
          })}
          error={errors.name}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby='name-error'
        />
        <FieldError id='name-error' error={errors.name} />
      </div>
      <div className='block text-sm'>
        <label htmlFor='nationalId' className='mb-1 font-medium'>{t('nationalId')}</label>
        <Input
          id='nationalId'
          {...register('nationalId', {
            required: t('requiredField'),
            pattern: /^[a-zA-Z1-9,0]+$/,
            minLength: { value: 14, message: t('nationalIdLength') },
            maxLength: { value: 14, message: t('nationalIdLength') },
          })}
          error={errors.nationalId}
          aria-invalid={errors.nationalId ? 'true' : 'false'}
          aria-describedby='nationalId-error'
        />
        <FieldError id='nationalId-error' error={errors.nationalId} />
      </div>
      <div className='block text-sm'>
        <label htmlFor='dob' className='mb-1 font-medium'>{t('dob')}</label>
        <Input
          id='dob'
          type='date'
          {...register('dob', { required: t('requiredField') })}
          error={errors.dob}
          aria-invalid={errors.dob ? 'true' : 'false'}
          aria-describedby='dob-error'
        />
        <FieldError id='dob-error' error={errors.dob} />
      </div>
      <div className='block text-sm'>
        <label htmlFor='gender' className='mb-1 font-medium'>{t('gender')}</label>
        <Select
          id='gender'
          {...register('gender', { required: t('requiredField') })}
          error={errors.gender}
          aria-describedby='gender-error'>
          <option value=''>{t('select')}</option>
          <option value='female'>{t('female')}</option>
          <option value='male'>{t('male')}</option>
          <option value='other'>{t('other')}</option>
        </Select>
        <FieldError id='gender-error' error={errors.gender} />
      </div>
      <div className='block text-sm'>
        <label htmlFor='address' className='mb-1 font-medium'>{t('address')}</label>
        <Input
          id='address'
          {...register('address', { required: t('requiredField') })}
          error={errors.address}
          aria-invalid={errors.address ? 'true' : 'false'}
          aria-describedby='address-error'
        />
        <FieldError id='address-error' error={errors.address} />
      </div>
      <div className='block text-sm'>
        <label htmlFor='city' className='mb-1 font-medium'>{t('city')}</label>
        <Input
          id='city'
          {...register('city', { required: t('requiredField') })}
          error={errors.city}
          aria-invalid={errors.city ? 'true' : 'false'}
          aria-describedby='city-error'
        />
        <FieldError id='city-error' error={errors.city} />
      </div>
      <div className='block text-sm'>
        <label htmlFor='state' className='mb-1 font-medium'>{t('state')}</label>
        <Input
          id='state'
          {...register('state', { required: t('requiredField') })}
          error={errors.state}
          aria-invalid={errors.state ? 'true' : 'false'}
          aria-describedby='state-error'
        />
        <FieldError id='state-error' error={errors.state} />
      </div>
      <div className='block text-sm'>
        <label htmlFor='country' className='mb-1 font-medium'>{t('country')}</label>
        <Input
          id='country'
          {...register('country', { required: t('requiredField') })}
          error={errors.country}
          aria-invalid={errors.country ? 'true' : 'false'}
          aria-describedby='country-error'
        />
        <FieldError id='country-error' error={errors.country} />
      </div>
      <div className='block text-sm'>
        <label htmlFor='phone' className='mb-1 font-medium'>{t('phone')}</label>
        <Input
          id='phone'
          {...register('phone', {
            required: t('requiredField'),
            pattern: {
              value: /^[0-9+-]{7,20}$/,
              message: t('invalidPhone'),
            },
          })}
          error={errors.phone}
          aria-invalid={errors.phone ? 'true' : 'false'}
          aria-describedby='phone-error'
        />
        <FieldError id='phone-error' error={errors.phone} />
      </div>
      <div className='block text-sm'>
        <label htmlFor='email' className='mb-1 font-medium'>{t('email')}</label>
        <Input
          id='email'
          type='email'
          {...register('email', {
            required: t('requiredField'),
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: t('invalidEmail'),
            },
          })}
          error={errors.email}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby='email-error'
        />
        <FieldError id='email-error' error={errors.email} />
      </div>
    </div>
  )
}
