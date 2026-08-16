interface ReflectionModalProps {
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  minLength?: number;
}

export default function ReflectionModal({
  open,
  value,
  onChange,
  onSave,
  onCancel,
  minLength = 10,
}: ReflectionModalProps) {
  if (!open) return null;

  const canSave = value.trim().length >= minLength;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 font-['Manrope'] shadow-xl">
        <p className="text-sm font-medium tracking-[1.6px] text-[#525252]">REQUIRED NOTES</p>
        <p className="mt-2 whitespace-pre-wrap text-base font-medium text-black">
          {'What happened, and what will you do differently next time?\n\nMissed deadlines happen. Take a moment to name what got in the way — no judgment, just clarity for next time.'}
        </p>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="mt-3 w-full rounded-lg border border-[#a3a3a3] bg-white p-3 text-sm text-black shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] focus:outline-none"
        />

        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl px-4 py-2 text-sm font-bold text-[#6b6b6b] hover:text-[#171717]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={!canSave}
            className="rounded-2xl bg-[#2b2b2b] px-6 py-2 text-sm font-bold text-white hover:bg-[#171717] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}