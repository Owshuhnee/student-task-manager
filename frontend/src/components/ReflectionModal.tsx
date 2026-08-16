interface ReflectionModalProps {
  open: boolean
  value: string
  onChange: (value: string) => void
  onSave: () => void
  onCancel: () => void
  minLength?: number
}

function ReflectionModal({ open, value, onChange, onSave, onCancel, minLength = 10 }: ReflectionModalProps) {
  if (!open) return null

  const tooShort = value.trim().length < minLength

  return (
    <div>
      <h2>Reflection required</h2>
      <p>Marking a task as Incomplete requires a short reflection on what happened (at least {minLength} characters).</p>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} />
      {tooShort && (
        <p style={{ color: 'red' }}>
          Reflection must be at least {minLength} characters ({value.trim().length}/{minLength}).
        </p>
      )}
      <button type="button" onClick={onSave} disabled={tooShort}>Save reflection</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default ReflectionModal