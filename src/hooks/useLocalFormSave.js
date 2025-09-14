import { useEffect } from 'react'

export function useLocalFormSave(formKey, getValues, stepIndex) {

  useEffect(() => {
    const onUnload = () => {
      localStorage.setItem(formKey, JSON.stringify(getValues()))
      localStorage.setItem(`${formKey}-step`, stepIndex)
    }

    window.addEventListener('beforeunload', onUnload)
    return () => window.removeEventListener('beforeunload', onUnload)
  }, [formKey, stepIndex])

  function load() {
    const raw = localStorage.getItem(formKey)
    const step = localStorage.getItem(`${formKey}-step`)

    if (!raw || step === undefined) return null
    try {
      return [JSON.parse(raw), parseInt(step, 10)]
    } catch {
      return null
    }
  }

  function unload() {
    localStorage.removeItem(formKey)
  }

  return { load, unload }
}
