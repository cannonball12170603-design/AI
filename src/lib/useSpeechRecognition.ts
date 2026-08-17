import { useCallback, useEffect, useRef, useState } from 'react'

type UseSpeechRecognitionOptions = {
  lang?: string
  onResult: (transcript: string) => void
}

export function useSpeechRecognition({ lang = 'ja-JP', onResult }: UseSpeechRecognitionOptions) {
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const SpeechRecognitionCtor =
    typeof window !== 'undefined' ? (window.SpeechRecognition ?? window.webkitSpeechRecognition) : undefined
  const supported = Boolean(SpeechRecognitionCtor)

  useEffect(() => {
    return () => recognitionRef.current?.abort()
  }, [])

  const start = useCallback(() => {
    if (!SpeechRecognitionCtor || recognitionRef.current) return

    const recognition = new SpeechRecognitionCtor()
    recognition.lang = lang
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = (event) => {
      const transcript = event.results.item(0)?.item(0)?.transcript
      if (transcript) onResult(transcript.trim())
    }
    recognition.onend = () => {
      recognitionRef.current = null
      setListening(false)
    }
    recognition.onerror = () => {
      recognitionRef.current = null
      setListening(false)
    }

    recognitionRef.current = recognition
    setListening(true)
    recognition.start()
  }, [SpeechRecognitionCtor, lang, onResult])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
  }, [])

  return { supported, listening, start, stop }
}
