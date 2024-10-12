import { Dumbbell, LogOut, UserPen } from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { SeriesProps } from '@/interfaces/exercises'

import { AvatarMenu } from './avatar-menu'
import { ExecutionQuantity } from './execution-quantity'
import { ThemeToggle } from './theme/theme-toggle'
import { Button } from './ui/button'

export interface SeriesExecutionProps {
  series: SeriesProps[]
}

export function SeriesExecution({ series }: SeriesExecutionProps) {
  const [seriesSelected, setSeriesSelected] = useState<SeriesProps[]>(series)

  console.log(seriesSelected, 'seriesSelected')
  const handleUpdateSeries = (
    currentSeries: number,
    repetition: number,
    weight: number,
  ) => {
    console.log(repetition, weight)
    setSeriesSelected((prevItems) =>
      prevItems.map((item) =>
        item.currentSeries === currentSeries
          ? { ...item, weight, repetition }
          : item,
      ),
    )
  }

  const handleAddNewExercise = () => {
    setSeriesSelected((prev) => [
      ...prev,
      {
        currentSeries: prev.length + 1,
        repetition: 0,
        weight: 0,
      },
    ])

    // scrollTo(screenHeight)
  }

  console.log(seriesSelected, 'seriesSelected')
  return (
    <div className="mb-16 flex flex-col gap-2 overflow-y-scroll">
      {seriesSelected.map((serie, index) => (
        <ExecutionQuantity
          key={index}
          currentSeries={serie.currentSeries}
          repetition={serie.repetition}
          weight={serie.weight}
          updateSeries={handleUpdateSeries}
        />
      ))}
      <div className="flex justify-start pb-2">
        <Button
          size={'lg'}
          variant="secondary"
          className="text-base font-bold text-green-700 hover:text-green-600"
          type="submit"
          onClick={handleAddNewExercise}
        >
          Adicionar
        </Button>
      </div>
    </div>
  )
}