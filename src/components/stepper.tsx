// StepperHeader.tsx
import { motion } from 'framer-motion'

export function Stepper({ step, total, label }: {
  step: number
  total: number
  label?: string
}) {
  const percentage = Math.min((step / total) * 100, 100)

  return (
    <div className="w-full px-6 pt-6">
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span className="font-medium">
          {label ?? `Passo ${step} de ${total}`}
        </span>
        <span className="text-xs">{Math.round(percentage)}%</span>
      </div>

      <div className="mt-2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
        <motion.div
          className="h-full rounded-full bg-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
