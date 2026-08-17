import { useSpeechRecognition } from '../lib/useSpeechRecognition'

type VoiceInputButtonProps = {
  onTranscript: (text: string) => void
  ariaLabel?: string
}

export default function VoiceInputButton({ onTranscript, ariaLabel = '音声入力' }: VoiceInputButtonProps) {
  const { supported, listening, start, stop } = useSpeechRecognition({ onResult: onTranscript })

  if (!supported) return null

  return (
    <button
      type="button"
      className={`mic-btn${listening ? ' mic-btn--active' : ''}`}
      onClick={() => (listening ? stop() : start())}
      aria-label={ariaLabel}
      aria-pressed={listening}
      title={ariaLabel}
    >
      🎤
    </button>
  )
}
