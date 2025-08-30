import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

import { Card } from '@/components/card'
import { Button } from '@/components/ui/button'
import { useTraining } from '@/contexts/TrainingContext'
import { ExerciseSeriesProps } from '@/interfaces/exercises'

export default function Exercises() {
    const { push, query } = useRouter()

    const idTraining = query.id
  console.log(query, 'query')

  const { sessionTraining } = useTraining()
    console.log(sessionTraining, 'sessionTraining')
  const handleNavigateExercise = (exercise: ExerciseSeriesProps) => {
    push(`/exercise/${exercise.id}`)
  }

  const handleStartSession = () => {
    push('/start-session')
  }

  return (
    <div className="flex h-[100%] w-[100%] max-w-[1240px] flex-col items-center gap-4">
      <div className="flex w-[inherit] items-center justify-center lg:relative lg:flex-col">
        <h5 className="text-base font-bold lg:mb-2 lg:text-2xl">
          {sessionTraining?.name || 'Treino'}
    </h5>   
        <Button
          size={'lg'}
          variant="ghost"
          className="absolute hidden w-[90%] text-base font-bold text-green-700 hover:text-green-600 lg:right-0 lg:flex lg:w-40"
          type="submit"
        >
          Iniciar o treino
        </Button>
      </div>

      <div className="flex h-[86%] w-[inherit] flex-col gap-2 overflow-y-scroll p-2 lg:gap-4 lg:p-4">
        {sessionTraining?.exercises.map((exercise) => (
          <Card
            exercise={exercise}
            onClick={() => handleNavigateExercise(exercise)}
          />
        ))}
      </div>

      <div className="absolute bottom-[1rem] left-1 right-1 flex flex-row items-center justify-center gap-4 lg:hidden">
        <Button
          size={'lg'}
          className="w-[90%] bg-green-500 text-base font-bold hover:bg-green-600 lg:w-8"
          onClick={handleStartSession}
        >
          Iniciar o treino
        </Button>
      </div>
    </div>
  )
}
