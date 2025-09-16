import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Step1Personal from './steps/Step1Personal'
import Step2FamilyFinancial from './steps/Step2FamilyFinancial'
import Step3Situation from './steps/Step3Situation'
import ProgressBar from './ui/ProgressBar'
import { submitApplication } from '../utils/mockApi'
// import Confetti from 'react-confetti'
// import { useWindowSize } from 'react-use'
import { useLocalFormSave } from '../hooks/useLocalFormSave'
import { useTranslation } from 'react-i18next'
import SubmissionSuccess from './SubmissionSuccess'
import Button from './ui/Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './Wizard.css'

const steps = [
  {
    id: 1,
    comp: Step1Personal,
    fields: [
      'name',
      'nationalId',
      'dob',
      'gender',
      'address',
      'city',
      'state',
      'country',
      'phone',
      'email',
    ],
    ref: React.createRef(),
  },
  {
    id: 2,
    comp: Step2FamilyFinancial,
    fields: [
      'maritalStatus',
      'dependents',
      'employmentStatus',
      'monthlyIncome',
      'housingStatus',
    ],
    ref: React.createRef(),
  },
  {
    id: 3,
    comp: Step3Situation,
    fields: [
      'financialSituation',
      'employmentCircumstances',
      'reasonForApplying',
    ],
    ref: React.createRef(),
  },
]
export default function Wizard() {
  const methods = useForm({
    defaultValues: {},
    mode: 'onTouched', // Validate on blur, then on change
  })

  const [stepIndex, setStepIndex] = useState(0)
  const [direction, setDirection] = useState('right')
  const { load, unload } = useLocalFormSave(
    'social-form-v1',
    methods.getValues,
    stepIndex
  )
  const [submitting, setSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)
  const { t } = useTranslation()
  // const { width, height } = useWindowSize()

  React.useEffect(() => {
    const response = load()
    if (!response) return
    const [saved, step] = response
    if (!isNaN(step)) setStepIndex(step)
    if (saved) methods.reset(saved)
  }, [])

  const Current = steps[stepIndex].comp

  async function next() {
    const fields = steps[stepIndex].fields
    const valid = await methods.trigger(fields)
    if (!valid) return
    if (stepIndex < steps.length - 1) {
      setDirection('right')
      setStepIndex((s) => s + 1)
    }
    load()
  }

  function back() {
    if (stepIndex > 0) {
      setDirection('left')
      setStepIndex((s) => s - 1)
    }
  }

  function reset() {
    window.location.reload()
    unload()
    methods.reset()
    setStepIndex(0)
  }

  async function onSubmit(values) {
    console.log('submitting', values)
    setSubmitting(true)
    try {
      await submitApplication(values)
      unload() // Clear form from localStorage
      setSubmissionSuccess(true)
    } finally {
      setSubmitting(false)
    }
  }

  function handleStartNew() {
    methods.reset({})
    setStepIndex(0)
    setSubmissionSuccess(false)
  }

  if (submissionSuccess) {
    return (
      <>
        {/* <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={8000}
        /> */}
        <Card>
          <SubmissionSuccess onStartNew={handleStartNew} />
        </Card>
      </>
    )
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <ProgressBar
              className='mt-4'
              step={stepIndex + 1}
              steps={steps.length}
            />
          </CardHeader>
          <CardContent>
            <TransitionGroup
              className={`transition-wrapper px-1 ${
                direction === 'right' ? 'slide-right' : 'slide-left'
              }`}>
              <CSSTransition
                key={stepIndex}
                nodeRef={steps[stepIndex].ref}
                timeout={300}
                classNames='slide'>
                <div
                  ref={steps[stepIndex].ref}
                  className='transition-content'>
                  <Current />
                </div>
              </CSSTransition>
            </TransitionGroup>
          </CardContent>
          <CardFooter>
            {stepIndex === 0 ? (
              <Button
                type='button'
                onClick={reset}
                variant='secondary'>
                {t('reset')}
              </Button>
            ) : null}
            <Button
              type='button'
              onClick={back}
              disabled={stepIndex === 0}
              variant='secondary'>
              {t('back')}
            </Button>
            {stepIndex < steps.length - 1 ? (
              <Button
                type={'button'}
                onClick={next}>
                {t('next')}
              </Button>
            ) : null}
            {stepIndex === steps.length - 1 && (
              <Button
                type='submit'
                disabled={submitting}>
                {submitting ? t('submitting') : t('submit')}
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  )
}
