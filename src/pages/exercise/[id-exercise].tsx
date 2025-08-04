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

  return (
    <div className="flex h-full w-full max-w-[1240px] flex-col gap-6 px-4 pb-4 lg:gap-8">
  {/* Header */}
  <div className="flex items-center justify-between">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-4xl">
      {exercise.name}
    </h2>
    <Button
      size="lg"
      variant="ghost"
      className="text-base font-bold text-green-700 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
      type="submit"
    >
      Pronto
    </Button>
  </div>

  {/* Card da Imagem */}
  <div className="flex justify-center">
    <div className="rounded-3xl overflow-hidden shadow-lg dark:shadow-md border border-gray-200 dark:border-gray-700">
      <Image
        src={
          exercise.image ||
          'https://i.pinimg.com/564x/be/73/bc/be73bc8e5cf79b0c9ab385fa5409b2ca.jpg'
        }
        width={420}
        height={300}
        alt={
          exercise.image
            ? `Imagem do exercício ${exercise.name}`
            : `Sem imagem para o exercício ${exercise.name}`
        }
        className="h-[200px] w-[300px] object-cover lg:h-[300px] lg:w-[420px]"
      />
    </div>
  </div>

  {/* Séries */}
  <div className="flex flex-col gap-4">
    {exercise.series.map((serie, index) => (
      <ExecutionQuantity
        key={index.toString()}
        id={index.toString()}
        currentSeries={serie.currentSeries}
        repetition={serie.repetition}
        weight={serie.weight} // Corrigido: estava usando repetition no lugar de weight
      />
    ))}
  </div>
</div>

  )
}
