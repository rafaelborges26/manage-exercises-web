import { Minus, Plus } from 'lucide-react'

export function CounterInput({ value, onChange }: {
  value: number
  onChange: (newValue: number) => void
}) {
  const handleDecrement = () => {
    if (value > 0) onChange(value - 1)
  }

  const handleIncrement = () => {
    onChange(value + 1)
  }

  return (
    <div className="flex items-center justify-start gap-3">
      <button
        type="button"
        onClick={handleDecrement}
        className="rounded-full border border-slate-300 p-2 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
        aria-label="Diminuir sessões"
      >
        <Minus className="h-4 w-4" />
      </button>

      <div className="min-w-[56px] rounded-lg border border-slate-300 px-4 py-2 text-center text-base font-medium dark:border-slate-600">
        {value}
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        className="rounded-full border border-slate-300 p-2 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
        aria-label="Aumentar sessões"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
