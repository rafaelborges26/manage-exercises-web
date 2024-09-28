import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

import { Card } from '@/components/card'
import { Button } from '@/components/ui/button'
import { ExerciseProps } from '@/interfaces/exercises'

const inter = Inter({ subsets: ['latin'] })

export default function Routines() {
  const { push } = useRouter()

  const exercises: ExerciseProps[] = [
    {
      id: '1',
      name: 'Supino reto',
      description: 'supino com barra dropset',
      series: [
        {
          currentSeries: 1,
          repetition: 10,
          weight: 20,
        },
        {
          currentSeries: 2,
          repetition: 10,
          weight: 20,
        },
        {
          currentSeries: 2,
          repetition: 10,
          weight: 20,
        },
        {
          currentSeries: 2,
          repetition: 10,
          weight: 20,
        },
        {
          currentSeries: 2,
          repetition: 10,
          weight: 20,
        },
        {
          currentSeries: 2,
          repetition: 10,
          weight: 20,
        },
        {
          currentSeries: 2,
          repetition: 10,
          weight: 20,
        },
        {
          currentSeries: 2,
          repetition: 10,
          weight: 20,
        },
        {
          currentSeries: 2,
          repetition: 10,
          weight: 20,
        },
      ],
    },
    {
      id: '2',
      name: 'Supino inclinado',
      description: 'supino inclinado com barra',
      image:
        'https://i.pinimg.com/originals/5c/c3/aa/5cc3aad2f41f1ab49baddb11bbd21e90.jpg',
      series: [
        {
          currentSeries: 1,
          repetition: 12,
          weight: 10,
        },
        {
          currentSeries: 2,
          repetition: 12,
          weight: 10,
        },
        {
          currentSeries: 3,
          repetition: 8,
          weight: 12,
        },
      ],
    },
    {
      id: '3',
      name: 'Supino inclinado',
      description: 'supino inclinado com barra',
      image:
        'https://i.pinimg.com/originals/5c/c3/aa/5cc3aad2f41f1ab49baddb11bbd21e90.jpg',
      series: [
        {
          currentSeries: 1,
          repetition: 12,
          weight: 10,
        },
        {
          currentSeries: 2,
          repetition: 12,
          weight: 10,
        },
        {
          currentSeries: 3,
          repetition: 8,
          weight: 12,
        },
      ],
    },
    {
      id: '4',
      name: 'Supino inclinado',
      description: 'supino inclinado com barra',
      image:
        'https://i.pinimg.com/originals/5c/c3/aa/5cc3aad2f41f1ab49baddb11bbd21e90.jpg',
      series: [
        {
          currentSeries: 1,
          repetition: 12,
          weight: 10,
        },
        {
          currentSeries: 2,
          repetition: 12,
          weight: 10,
        },
        {
          currentSeries: 3,
          repetition: 8,
          weight: 12,
        },
      ],
    },
    {
      id: '5',
      name: 'Supino inclinado',
      description: 'supino inclinado com barra',
      image:
        'https://i.pinimg.com/originals/5c/c3/aa/5cc3aad2f41f1ab49baddb11bbd21e90.jpg',
      series: [
        {
          currentSeries: 1,
          repetition: 12,
          weight: 10,
        },
        {
          currentSeries: 2,
          repetition: 12,
          weight: 10,
        },
        {
          currentSeries: 3,
          repetition: 8,
          weight: 12,
        },
      ],
    },
    {
      id: '6',
      name: 'Supino inclinado',
      description: 'supino inclinado com barra',
      image:
        'https://i.pinimg.com/originals/5c/c3/aa/5cc3aad2f41f1ab49baddb11bbd21e90.jpg',
      series: [
        {
          currentSeries: 1,
          repetition: 12,
          weight: 10,
        },
        {
          currentSeries: 2,
          repetition: 12,
          weight: 10,
        },
        {
          currentSeries: 3,
          repetition: 8,
          weight: 12,
        },
      ],
    },
  ]

  const handleNavigateExercise = (idExercise: string) => {
    push(`/exercise/${idExercise}`)
  }

  return (
    <div className="flex h-[100%] w-[100%] max-w-[1240px] flex-col items-center gap-4">
      <div className="flex w-[inherit] items-center justify-center lg:relative lg:flex-col">
        <h5 className="text-base font-bold lg:mb-2 lg:text-2xl">
          Rotinas de treino
        </h5>
        <Button
          size={'lg'}
          variant="ghost"
          className="absolute hidden w-[90%] text-base font-bold text-green-700 hover:text-green-600 lg:right-0 lg:flex lg:w-40"
          type="submit"
        >
          Adicionar
        </Button>
      </div>

      <div className="flex h-[86%] w-[inherit] flex-col gap-2 overflow-y-scroll p-2 lg:gap-4 lg:p-4">
        {exercises.map((exercise) => (
          <Card
            exercise={exercise}
            onClick={() => handleNavigateExercise(exercise.id)}
          />
        ))}
      </div>

      <div className="absolute bottom-[1rem] left-1 right-1 flex flex-row items-center justify-center gap-4 lg:hidden">
        <Button
          size={'lg'}
          className="w-[90%] bg-green-500 text-base font-bold hover:bg-green-600 lg:w-8"
        >
          Adicionar rotina
        </Button>
      </div>
    </div>
  )
}
