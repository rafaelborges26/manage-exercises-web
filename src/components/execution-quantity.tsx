import { useState } from 'react'

import { SeriesProps } from '@/interfaces/exercises'

import { Input } from './ui/input'
import { Separator } from './ui/separator'

interface EvolutionQuantityProps {
  currentSeries: number
  repetition: number
  weight: number
  idTraining: string
  updateSeries: (
    currentSeries: number,
    repetition: number,
    weight: number,
  ) => void
}

export function ExecutionQuantity({
  idTraining,
  currentSeries,
  repetition,
  weight,
  updateSeries,
}: EvolutionQuantityProps) {
  const [repetitionUpdated, setRepetitionUpdated] = useState(repetition)
  const [weightUpdated, setWeightUpdated] = useState(weight)

  const handleUpdateSeries = () => {
    updateSeries(currentSeries, repetitionUpdated, weightUpdated)
  }

  return (
    <div className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:p-6">
  {/* Série Atual */}
  <div className="flex w-1/4 flex-col items-center justify-center">
    <span className="text-3xl font-semibold text-gray-800 dark:text-white">
      {currentSeries}
    </span>
    <span className="text-sm text-gray-500 dark:text-gray-400">Série</span>
  </div>

  <Separator orientation="vertical" className="h-12 bg-gray-300 dark:bg-zinc-700" />

  {/* Repetições */}
  <div className="flex w-1/3 flex-col items-center justify-center gap-1">
    <Input
      type="number"
      min={1}
      value={repetitionUpdated}
      onChange={(e) => setRepetitionUpdated(Number(e.target.value))}
      onBlur={handleUpdateSeries}
      className="w-20 text-center text-2xl font-medium border-b-2 border-gray-300 dark:border-zinc-700 bg-transparent focus:outline-none"
    />
    <span className="text-sm text-gray-600 dark:text-gray-400">Repetições</span>
  </div>

  <Separator orientation="vertical" className="h-12 bg-gray-300 dark:bg-zinc-700" />

  {/* Peso */}
  <div className="flex w-1/3 flex-col items-center justify-center gap-1">
    <Input
      type="number"
      min={0}
      value={weightUpdated}
      onChange={(e) => setWeightUpdated(Number(e.target.value))}
      onBlur={handleUpdateSeries}
      className="w-20 text-center text-2xl font-medium border-b-2 border-gray-300 dark:border-zinc-700 bg-transparent focus:outline-none"
    />
    <span className="text-sm text-gray-600 dark:text-gray-400">Peso (kg)</span>
  </div>
</div>

  )
}
