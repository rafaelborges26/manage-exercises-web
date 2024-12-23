import { useState } from 'react'

import { SeriesProps } from '@/interfaces/exercises'

import { Input } from './ui/input'
import { Separator } from './ui/separator'

interface EvolutionQuantityProps {
  currentSeries: number
  repetition: number
  weight: number
  updateSeries: (
    currentSeries: number,
    repetition: number,
    weight: number,
  ) => void
}

export function ExecutionQuantity({
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
    <div className="flex w-auto flex-row items-center justify-between rounded-lg bg-gray-100 px-4 dark:bg-zinc-900">
      <span className="flex w-[30%] items-center justify-center p-4 text-2xl lg:p-6 lg:text-3xl lg:font-medium">
        {currentSeries}
      </span>
      <Separator orientation="vertical" />
      <div className="flex w-[30%] flex-col items-center justify-center p-4 font-medium lg:p-6">
        <Input
          className="w-16 border-b border-solid border-b-gray-100 bg-transparent text-center text-2xl font-medium lg:w-[5.5rem] lg:text-3xl"
          id="repetiçoes"
          type="number"
          value={repetitionUpdated}
          onChange={(e) => setRepetitionUpdated(Number(e.target.value))}
          onBlur={handleUpdateSeries}
        />
        <span className="flex w-16 items-center justify-center text-center text-xl font-normal lg:text-2xl">
          Repetições
        </span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex w-10 w-[30%] flex-col items-center justify-center p-6">
        <Input
          className="w-20 border-b border-solid border-b-gray-100 bg-transparent text-center text-2xl font-medium lg:w-[5.5rem] lg:text-3xl"
          id="peso"
          value={weightUpdated}
          aria-autocomplete="none"
          type="number"
          min={1}
          onChange={(e) => setWeightUpdated(Number(e.target.value))}
          onBlur={handleUpdateSeries}
        />
        <span className="flex w-16 items-center justify-center text-center text-xl font-normal lg:text-2xl">
          Peso
        </span>
      </div>
    </div>
  )
}
