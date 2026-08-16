interface ConfirmModalProps {
  open: boolean
  message: string
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmModal({ open, message, onConfirm, onCancel }: ConfirmModalProps) {
  if (!open) return null
  return (
    <div>
      <p>{message}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default ConfirmModal