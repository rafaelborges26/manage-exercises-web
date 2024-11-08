import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import emptyImage from '@/assets/images/empty.png'
import { SeriesExecution } from '@/components/series-execution'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTraining } from '@/contexts/TrainingContext'
import { ExerciseSeriesProps, SeriesProps } from '@/interfaces/exercises'
import {
  initialValuesExercise,
  InitialValuesSeries,
} from '@/utils/initialValues'

export default function CreateExercise() {
  const router = useRouter()
  const { createExerciseDispatch, training } = useTraining()

  const [exercises, setExercises] = useState<ExerciseSeriesProps>(
    initialValuesExercise,
  )

  const [seriesSelected, setSeriesSelected] = useState<SeriesProps[]>(
    exercises.series,
  )

  console.log(exercises, 'exercises na page')

  const [screenHeight, setScreenHeight] = useState(0)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      const imageBase64 = reader.result as string
      setExercises((prev) => ({
        ...prev,
        image: imageBase64,
      }))
    }

    if (file) {
      reader.readAsDataURL(file) // Converte a imagem para Base64
    }
  }

  const handleCreateNewExercise = () => {
    updateExercise()
    resetForm()
  }

  const resetForm = () => {
    setExercises(initialValuesExercise)
    setSeriesSelected(initialValuesExercise.series)
  }

  const updateExercise = () => {
    const newExercise: ExerciseSeriesProps = {
      id: new Date().toISOString(),
      idTraining: training.id,
      series: seriesSelected,
      name: exercises.name,
      image: exercises.name,
    }

    setExercises(newExercise)
    createExerciseDispatch(newExercise)
  }

  const handleNavigateTraining = () => {
    router.push(`training/${training.id}`)
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    console.log(exercises, 'exercises page')
  }, [exercises.series])

  return (
    <div className="relative flex h-[100%] w-[100%] max-w-[1240px] flex-col gap-4 px-6 lg:gap-2">
      <div className="flex w-[100%] flex-col gap-4 lg:mt-4">
        <div className="relative flex items-center justify-center">
          <button className="absolute bottom-0 left-2 top-0 border-none bg-transparent">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold tracking-tight">
            Seleção de exercícios
          </h1>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-10 w-[100%] bg-slate-50 p-4 shadow-lg dark:bg-black">
        <Button className="w-[100%] lg:w-44" onClick={handleCreateNewExercise}>
          Continuar
        </Button>
      </div>
    </div>
  )
}
