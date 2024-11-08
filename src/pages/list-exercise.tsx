import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import emptyImage from '@/assets/images/empty.png'
import MultiSelect, { MultiSelectProps } from '@/components/multiselect'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTraining } from '@/contexts/TrainingContext'

export interface SelectOptionsProps {
  idExercise: string
  nameExercise: string
}

export default function ListExercise() {
  const { createTrainingDispatch } = useTraining()

  const listExerciseSchema = z.object({
    training: z.string(),
    type: z.string(),
  })

  type ListExerciseSchema = z.infer<typeof listExerciseSchema>

  const [selectedType, setSelectedType] = useState('01')

  const { register, getValues, setValue } = useForm<ListExerciseSchema>({
    resolver: zodResolver(listExerciseSchema),
    defaultValues: {
      training: '',
      type: '',
    },
  })

  const router = useRouter()

  const backPageCreateTraining = () => {
    router.push('create-training')
  }
  const options: SelectOptionsProps[] = [
    {
      idExercise: '0',
      nameExercise: 'supino maquina',
    },
    {
      idExercise: '1',
      nameExercise: 'supino reto',
    },
    {
      idExercise: '2',
      nameExercise: 'supino inclina',
    },
  ]

  useEffect(() => {
    setValue('type', selectedType)
  }, [getValues('type')])

  return (
    <div className="relative flex h-[100%] w-[100%] max-w-[1240px] flex-col items-center gap-4">
      <div className="flex w-[100%] flex-col items-start justify-center gap-5 p-6 lg:w-[70%]">
        <div className="flex w-[100%] flex-col gap-4 lg:mt-4">
          <div className="relative flex items-center justify-center">
            <button
              onClick={backPageCreateTraining}
              className="absolute bottom-0 left-2 top-0 border-none bg-transparent"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="inline-flex justify-center text-3xl font-bold tracking-tight">
              Exercícios
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <p>Nome</p>
            <Input {...register('training')} placeholder="Perna" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex w-[100%] flex-col gap-2">
              <p>Tipo</p>
              <MultiSelect options={options} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-[0px] flex w-[88%] lg:relative lg:mt-4">
          <Button
            size={'lg'}
            className="w-[100%] text-base font-bold transition-colors hover:bg-slate-700 dark:hover:bg-slate-300 lg:w-44"
            type="button"
          >
            Pronto
          </Button>
        </div>
      </div>
    </div>
  )
}
