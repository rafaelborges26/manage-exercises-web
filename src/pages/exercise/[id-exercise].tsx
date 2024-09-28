import Image from 'next/image'
import { useRouter } from 'next/router'

import { ExecutionQuantity } from '@/components/execution-quantity'
import { Button } from '@/components/ui/button'

export default function Product() {
  const { query } = useRouter()

  // get route with id query

  const exercise = {
    name: 'Supino inclinado',
    description: 'supino inclinado com barra',
    image:
      'https://i.pinimg.com/564x/44/16/4f/44164f75d43efd9e90a1c9deb949a2bc.jpg',
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
  }

  // console.log(JSON.stringify(query))

  return (
    <div className="flex h-[100%] w-[100%] max-w-[1240px] flex-col gap-4 px-6 lg:gap-8">
      <div className="flex items-center justify-between">
        <h2 className="flex justify-between text-xl font-semibold lg:mb-2 lg:text-4xl">
          {exercise.name}
        </h2>
        <Button
          size={'lg'}
          variant="ghost"
          className="text-base font-bold text-green-700 hover:text-green-600"
          type="submit"
        >
          Pronto
        </Button>
      </div>

      <div className="flex items-center justify-center">
        <Image
          src={
            exercise.image ||
            'https://i.pinimg.com/564x/be/73/bc/be73bc8e5cf79b0c9ab385fa5409b2ca.jpg'
          }
          width={300}
          height={300}
          alt={
            exercise.image
              ? exercise.image
              : `Sem conteúdo imagem para o exercício ${exercise.name}`
          }
          className="h-[200px] w-[300px] rounded-3xl lg:flex lg:h-[300px] lg:w-[420px] lg:items-center lg:justify-center"
        />
      </div>

      {exercise.series.map((serie) => (
        <ExecutionQuantity
          currentSeries={serie.currentSeries}
          repetition={serie.repetition}
          weight={serie.repetition}
        />
      ))}
    </div>
  )
}
