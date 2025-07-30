import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, X, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import emptyImage from '@/assets/images/empty.png'
import { SeriesExecution } from '@/components/series-execution'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Routes } from '@/constants/routes'
import { useTraining } from '@/contexts/TrainingContext'
import { ExerciseSeriesProps, SeriesProps } from '@/interfaces/exercises'
import { ExerciseDetailedResponse } from '@/models/exercises'
import { api } from '@/services/api'
import {
  initialValuesExercise,
  InitialValuesSeries,
} from '@/utils/initialValues'

export default function SelectionExercise() {
  const { push, query } = useRouter()
  const idExercise = query.id
  console.log(query, 'query')

  const { createExerciseDispatch, training } = useTraining()

  const [exercise, setExercise] = useState<ExerciseDetailedResponse>()

  console.log(exercise, 'exercises na page')

  const [screenHeight, setScreenHeight] = useState(0)

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  const file = event.target.files?.[0]
  //  const reader = new FileReader()
  //
  //  reader.onloadend = () => {
  //    const imageBase64 = reader.result as string
  //    setExercises((prev) => ({
  //      ...prev,
  //      image: imageBase64,
  //    }))
  //  }
  //
  //  if (file) {
  //    reader.readAsDataURL(file) // Converte a imagem para Base64
  //  }
  // }

  const handleSelectExercise = () => {
    if (exercise) {
      createExerciseDispatch({
        id: exercise.id,
        name: exercise.name,
        muscleGroup: exercise.muscleGroup,
        image: exercise.image,
        idTraining: training.id,
        series: [InitialValuesSeries],
      })

      push('/create-exercise')
    }
  }

  const handleNavigateBack = () => {
    push('/choose-exercises')
  }

  // const handleCreateNewExercise = () => {
  //  updateExercise()
  //  resetForm()
  // }

  // const resetForm = () => {
  //  setExercises(initialValuesExercise)
  //  setSeriesSelected(initialValuesExercise.series)
  // }

  // const updateExercise = () => {
  //  const newExercise: ExerciseSeriesProps = {
  //    id: new Date().toISOString(),
  //    idTraining: training.id,
  //    series: seriesSelected,
  //    name: exercises.name,
  //    image: exercises.name,
  //  }
  //
  //  setExercises(newExercise)
  //  createExerciseDispatch(newExercise)
  // }

  // const handleNavigateTraining = () => {
  //  push(`training/${training.id}`)
  // }

  const getExercise = async () => {
    try {
      console.log(idExercise, typeof idExercise)
      if (idExercise && typeof idExercise === 'string') {
        const { data } = await api.get<ExerciseDetailedResponse>(
          `api/${Routes.exerciseById}/${idExercise}`,
        )

        setExercise({
          id: data.id,
          description: data.description,
          purpose: data.purpose,
          muscleGroup: data.muscleGroup,
          image: data.image,
          name: data.name,
        })
      }
    } catch (err) {
      // setError('Erro ao carregar exercício')
    } finally {
      // setLoading(false)
    }
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
    getExercise()
  }, [])

  return (
    <div className="relative flex h-[100%] w-[100%] max-w-[1240px] flex-col gap-4 px-6 lg:gap-2">
      <div className="mb-8 flex w-[100%] flex-col gap-4 lg:mt-4">
          <div className="flex items-center justify-between w-full">
  <button
    onClick={handleNavigateBack}
    className="text-gray-500 hover:text-black dark:hover:text-white"
  >
    <ArrowLeft size={24} />
  </button>
  <h1 className="text-xl font-semibold tracking-tight text-center flex-1">
    Detalhes do exercício
  </h1>
  <div className="w-6" /> {/* Espaço para equilibrar visualmente */}
</div>

      </div>

      <h6 className="text-2xl font-semibold tracking-tight">
        {exercise?.name}
      </h6>

      <div className="flex flex-row gap-1">
        <p>Finalidade:</p>
        <span>{exercise?.purpose}</span>
      </div>

      <div className="mb-4">
        <p>Descrição</p>
        <span>{exercise?.description}</span>
      </div>

      <div className="flex flex-col gap-2 pb-20 lg:pb-2">
        <h5>Execução:</h5>

        <div className="flex flex-row gap-4 overflow-scroll">
          <Image
            src={exercise?.image ?? ''}
            width={300}
            height={300}
            alt={exercise?.name ?? 'Exercício'}
            className="h-[200px] w-[300px] rounded-3xl lg:flex lg:h-[300px] lg:w-[420px] lg:items-center lg:justify-center"
          />

          <Image
            src={
              'https://i.pinimg.com/564x/be/73/bc/be73bc8e5cf79b0c9ab385fa5409b2ca.jpg'
            }
            width={300}
            height={300}
            alt="Ëxercise name"
            className="h-[200px] w-[300px] rounded-3xl lg:flex lg:h-[300px] lg:w-[420px] lg:items-center lg:justify-center"
          />
        </div>
      </div>

       <div className="fixed bottom-0 left-0 right-0 z-10 w-full bg-white dark:bg-black p-4 border-t border-gray-200 dark:border-gray-700 shadow-inner">
        <div className="flex justify-center">
          <Button
            onClick={handleSelectExercise}
            variant={'default'}
            className="w-full lg:w-48 font-semibold gap-2 transition-all duration-300"
          >
            <CheckCircle size={18} />
            Selecionar exercício
          </Button>
        </div>
      </div>
    </div>
  )
}
