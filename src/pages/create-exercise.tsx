import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
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

  const { createExercisesDispatch, training, exercise } = useTraining()

  const [exerciseFilled, setExerciseFilled] = useState<ExerciseSeriesProps>(
    initialValuesExercise,
  )

  const [seriesSelected, setSeriesSelected] = useState<SeriesProps[]>([
    InitialValuesSeries,
  ])

  console.log(seriesSelected, 'seriesSelected')

  console.log(exercise, 'exercises na page')

  const [screenHeight, setScreenHeight] = useState(0)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      const imageBase64 = reader.result as string
      setExerciseFilled((prev) => ({
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
    router.push('choose-exercises')
    // resetForm()
  }

  // const resetForm = () => {
  //  setExercises(initialValuesExercise)
  //  setSeriesSelected(initialValuesExercise.series)
  // }

  const updateExercise = () => {
    const newExercise: ExerciseSeriesProps = {
      id: exercise.id,
      idTraining: training.id,
      series: seriesSelected,
      name: exercise.name,
      muscleGroup: exercise.muscleGroup,
      image: exercise.image,
    }

    setExerciseFilled(newExercise)
    createExercisesDispatch(newExercise)
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

  return (
    <div className="relative flex h-[100%] w-[100%] max-w-[1240px] flex-col gap-4 px-6 lg:gap-2">
      <div className="mb-2 flex items-center justify-between gap-2">
        <Input
          className="flex w-[80%] justify-between text-xl font-semibold lg:h-10 lg:py-6"
          placeholder="Exercicio"
          value={exercise.name}
          disabled
          onChange={(e) => {
            setExerciseFilled((prev) => ({
              ...prev,
              name: e.target.value,
            }))
            console.log('test')
          }}
        />
        <button onClick={handleNavigateTraining}>
          <X width={24} height={24} />
        </button>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex w-[100%] items-center justify-center">
          <label
            htmlFor="file-input"
            className="flex items-center justify-center"
          >
            <Image
              src={exerciseFilled.image || exercise.image || emptyImage}
              alt={
                exerciseFilled.image ||
                `Sem conteúdo imagem para o exercício exercicio ${exercise.name}`
              }
              width={300}
              height={300}
              className="h-[200px] w-[300px] rounded-3xl lg:flex lg:h-[300px] lg:w-[420px] lg:items-center lg:justify-center"
            />
          </label>
        </div>

        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <SeriesExecution series={seriesSelected} setSeries={setSeriesSelected} />
      <div className="fixed bottom-0 left-0 z-10 w-[100%] bg-slate-50 p-4 shadow-lg dark:bg-black">
        <Button className="w-[100%] lg:w-44" onClick={handleCreateNewExercise}>
          Continuar
        </Button>
      </div>
    </div>
  )
}
