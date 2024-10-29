import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import emptyImage from '@/assets/images/empty.png'
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

export default function CreateTraining() {
  const { createTrainingDispatch } = useTraining()

  const createTrainingSchema = z.object({
    name: z.string(),
    sessions: z.number(),
    type: z.string(),
  })

  type CreateTrainingSchema = z.infer<typeof createTrainingSchema>

  const { register, handleSubmit, getValues, setValue } =
    useForm<CreateTrainingSchema>({
      resolver: zodResolver(createTrainingSchema),
      defaultValues: {
        name: '',
        sessions: 0,
        type: '',
      },
    })

  const router = useRouter()

  const handleCreateTraining = () => {
    console.log(getValues('type'), 'type')

    createTrainingDispatch({
      name: getValues('name'),
      type: getValues('type'),
      sessions: getValues('sessions'),
      id: new Date().toISOString(),
    })

    router.push('create-exercise')
  }

  return (
    <div className="relative flex h-[100%] w-[100%] max-w-[1240px] flex-col items-center gap-4">
      <div className="flex w-[100%] flex-col items-start justify-center gap-5 p-6 lg:w-[70%]">
        <div className="flex w-[100%] flex-col gap-4 lg:mt-4">
          <h1 className="mb-4 text-3xl font-bold tracking-tight">
            Montar treino
          </h1>
          <div className="flex flex-col gap-2">
            <p>Nome</p>
            <Input {...register('name')} placeholder="Treino A" />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex w-[100%] flex-col gap-2 lg:w-[50%]">
              <p>Tipo</p>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Hipertrofia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="01">Hipertrofia</SelectItem>
                  <SelectItem value="02">Emagrecimento</SelectItem>
                  <SelectItem value="03">Cardio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100%] flex-col gap-2 lg:w-[50%]">
              <p>Sessões</p>
              <Input type="number" {...register('sessions')} placeholder="20" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-[0px] flex w-[88%] lg:relative lg:mt-4">
          <Button
            size={'lg'}
            className="w-[100%] text-base font-bold transition-colors hover:bg-slate-700 dark:hover:bg-slate-300 lg:w-44"
            type="button"
            onClick={handleCreateTraining}
          >
            Pronto
          </Button>
        </div>
      </div>
    </div>
  )
}
