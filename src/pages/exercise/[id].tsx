import Image from 'next/image'
import { useRouter } from 'next/router'

import { ExecutionQuantity } from '@/components/execution-quantity'
import { Button } from '@/components/ui/button'
import { useTraining } from '@/contexts/TrainingContext'
import { useEffect, useState } from 'react'
import { ExerciseSeriesProps } from '@/interfaces/exercises'
import { initialValuesExercise } from '@/utils/initialValues'

export default function Product() {
  const { query } = useRouter()
  const { sessionTraining, updateTrainingSeries } = useTraining()

  const [exercise, setExercise] = useState<ExerciseSeriesProps>(initialValuesExercise)

  console.log(sessionTraining, 'sessionTraining')

  // get route with id query
      const idTraining = query.id

  

  const findExercise = () => {
    const exerciseFound = sessionTraining?.exercises.find(exercise => exercise.id === idTraining)

    console.log(exerciseFound)

    if(exerciseFound) setExercise(exerciseFound)
  }

  const updateExercises = (currentSeries: number, repetition: number, weight: number) => {
    console.log('teste', currentSeries, repetition, weight)
    updateTrainingSeries(idTraining?.toString() || '', currentSeries, repetition, weight)
    //chamar contexto pra alterar exercicios e series passando o idtreino e idserie

  }

  useEffect(() => {
    findExercise()
  },[])

  return (
   <div className="flex h-full w-full max-w-[1240px] flex-col gap-8 px-4 pb-6">
  {/* Header */}
<div className="sticky top-0 z-50 p-2 flex items-center justify-between border-b border-gray-200 
  bg-gradient-to-r from-white via-gray-50 to-white 
  dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 
  backdrop-blur-md pb-4 px-4">    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
      {exercise.name}
    </h2>
    <Button
      size="lg"
      variant="default"
      className="rounded-xl bg-green-600 text-white font-semibold hover:bg-green-500 transition-colors"
      type="submit"
    >
      Pronto
    </Button>
  </div>

  {/* Card da Imagem */}
  <div className="flex justify-center">
    <div className="rounded-3xl overflow-hidden shadow-lg dark:shadow-md border border-gray-200 dark:border-gray-700 max-w-[420px]">
      <Image
        src={
          exercise?.image ||
          'https://i.pinimg.com/564x/be/73/bc/be73bc8e5cf79b0c9ab385fa5409b2ca.jpg'
        }
        width={420}
        height={300}
        alt={
          exercise?.image
            ? `Imagem do exercício ${exercise.name}`
            : `Sem imagem para o exercício ${exercise.name}`
        }
        className="h-[200px] w-full object-cover lg:h-[300px]"
      />
    </div>
  </div>

  {/* Séries */}
  <div className="flex flex-col gap-4">
    {exercise.series.map((serie, index) => (
      <div
        key={index}
        className="rounded-xl bg-gray-50 shadow-sm border border-gray-200 p-4 dark:bg-zinc-900 dark:border-gray-700"
      >
        <ExecutionQuantity
          idTraining={idTraining?.toString() || ''}
          updateSeries={updateExercises}
          currentSeries={serie.currentSeries}
          repetition={serie.repetition}
          weight={serie.weight}
        />
      </div>
    ))}
  </div>
</div>

  )
}
