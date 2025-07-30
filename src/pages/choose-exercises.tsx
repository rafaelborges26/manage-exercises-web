import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import emptyImage from '@/assets/images/empty.png'
import { MultiSelect, OptionsProps } from '@/components/multiselect'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Routes } from '@/constants/routes'
import { useTraining } from '@/contexts/TrainingContext'
import { ExercisesResponse } from '@/models/exercises'
import { api } from '@/services/api'
import { Stepper } from '@/components/stepper'

export default function ChooseExercises() {
  const listExerciseSchema = z.object({
    training: z.string(),
    type: z.string(),
  })

  type ListExerciseSchema = z.infer<typeof listExerciseSchema>

  const router = useRouter()

  const [selectedType, setSelectedType] = useState('01')
  const { exercises, deleteExerciseDispatch, selectExercise } = useTraining()

  const [exercisesFiltered, setExercisesFiltered] = useState<
    ExercisesResponse[]
  >([])

  const { register, getValues, setValue } = useForm<ListExerciseSchema>({
    resolver: zodResolver(listExerciseSchema),
    defaultValues: {
      training: '',
      type: '',
    },
  })

  const exercisesOptions = useMemo(() => {
    const options = exercisesFiltered.map(
      ({ muscleGroup, ...exerciseOption }) => exerciseOption,
    )

    return options
  }, [exercisesFiltered])

  const backPageCreateTraining = () => {
    router.push('create-training')
  }

  const optionsSelected: OptionsProps[] = useMemo(() => {
    const exerciseFiltered: OptionsProps[] = exercises.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
    }))

    return exerciseFiltered
  }, [exercises])

  const handleNavigateExerciseDetail = (id: string) => {
    selectExercise(id)
    router.push(`/selection-exercise/${id}`)
  }

  const handleRemoveExercise = (idExercise: string) => {
    deleteExerciseDispatch(idExercise)
  }

  const getExerciseByMuscleGroup = async (muscleGroup: string) => {
    console.log(muscleGroup, 'muscleGroup input')
    try {
      const { data } = await api.get<ExercisesResponse[]>(
        `api/${Routes.exercises}`,
        {
          params: {
            muscleGroup,
          },
        },
      )
      setExercisesFiltered(data)
      console.log(data)
    } catch (err) {
      // setError('Erro ao carregar exercício')
    } finally {
      // setLoading(false)
    }
  }

  const handleConclude = () => {
    router.push('/resume-training')
  }

  useEffect(() => {
    setValue('type', selectedType)
  }, [getValues('type')])

  return (
    <div className="relative flex h-[100%] w-[100%] max-w-[1240px] flex-col items-center gap-4">
      <div className="flex w-[100%] flex-col items-start justify-center gap-5 p-6 lg:w-[70%]">
        <div className="flex w-[100%] flex-col gap-4 lg:mt-4">
          <div className="flex items-center justify-between w-full">
  <button
    onClick={backPageCreateTraining}
    className="text-gray-500 hover:text-black dark:hover:text-white"
  >
    <ArrowLeft size={24} />
  </button>
  <h1 className="text-xl font-semibold tracking-tight text-center flex-1">
    Exercícios
  </h1>
  <div className="w-6" />
</div>
          <Stepper step={2} total={3} label="Passo 2 de 4" />
          
          <div className="flex flex-col gap-2">
            <p>Treino</p>
            <Input
              {...register('training')}
              placeholder="Informe o grupo muscular"
              onBlur={(e) => {
                getExerciseByMuscleGroup(e.target.value)
              }}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex w-[100%] flex-col gap-2">
              <p>Exercício</p>
              <MultiSelect
                options={exercisesOptions}
                optionsSelected={optionsSelected}
                buttonOnClick={handleNavigateExerciseDetail}
                buttonRemove={handleRemoveExercise}
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-[0px] flex w-[88%] lg:relative lg:mt-4">
          
          <Button
            size={'lg'}
            className="w-[100%] text-base bg-green-600 text-white hover:bg-green-700 font-semibold rounded-xl py-3 transition lg:w-44"
            type="button"
            onClick={handleConclude}
          >
            Pronto
          </Button>
        </div>
      </div>
    </div>
  )
}
