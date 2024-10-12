import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { HTMLAttributes } from 'react'

import emptyImage from '@/assets/images/empty.png'
import { TrainingProps } from '@/interfaces/exercises'

export interface CardProps extends HTMLAttributes<HTMLButtonElement> {
  exercise: TrainingProps
}

export function Card({ exercise }: CardProps) {
  const router = useRouter()

  const siglas = 'RB'

  return (
    <button
      className="mh-[100px] lg:mh-[100px] flex w-[100%] flex-row items-center justify-between rounded-lg bg-slate-100 p-4 dark:bg-slate-900"
      onClick={() => router.push(`/exercise/${exercise.id}`)}
    >
      <div className="flex items-center gap-5">
        <Image
          src={exercise.image || emptyImage}
          width={150}
          height={150}
          alt={
            exercise.image
              ? exercise.image
              : `Sem conteúdo imagem para o exercício ${exercise.name}`
          }
          className="h-[150px] w-[150px] rounded-3xl lg:h-[200px] lg:w-[200px]"
        />

        <div className="flex flex-col items-start justify-center">
          <h5 className="text-base font-semibold lg:mb-2 lg:text-2xl">
            {exercise.name}
          </h5>
          <div className="flex h-32 flex-col flex-wrap items-start gap-x-6 lg:gap-y-1">
            {exercise.series.map((exercise) => (
              <p className="text-base font-normal text-muted-foreground">{`${exercise.currentSeries} • ${exercise.repetition}`}</p>
            ))}
          </div>
        </div>
      </div>

      <ChevronRight size={24} />
    </button>
  )
}
