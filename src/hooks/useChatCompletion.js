import { useState } from 'react'
import { GoogleGenAI } from '@google/genai'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY
const ai = new GoogleGenAI({ apiKey })

export default function useChatCompletion() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function getCompletion(prompt) {
    setLoading(true)
    setError(null)

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: prompt + '\n Respond in 5-10 lines, without expressing thoughts or personal opinions.',
        config: {
          thinkingConfig: {
            thinkingBudget: 0, // Disables thinking
            includeThoughts: false, // Disables thoughts
          },
        },
      })
      return response.text
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, getCompletion }
}
