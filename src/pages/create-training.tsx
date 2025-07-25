import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TypeTraining, typeTraining } from '@/constants'
import { useTraining } from '@/contexts/TrainingContext'

export default function CreateTraining() {
  const { createTrainingDispatch } = useTraining()

  const createTrainingSchema = z.object({
    name: z.string(),
    sessions: z.number(),
    type: z.string(),
  })

  type CreateTrainingSchema = z.infer<typeof createTrainingSchema>

  const [selectedType, setSelectedType] = useState('01')

  const { register, getValues, setValue, watch } = useForm<CreateTrainingSchema>({
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

    router.push('choose-exercises')
  }

  useEffect(() => {
    setValue('type', selectedType)
  }, [getValues('type')])

  console.log(getValues('type'), 'type getvalue')
  console.log(watch('type'), 'type watch')

  return (
    <div className="relative flex h-[100%] w-[100%] max-w-[1240px] flex-col items-center gap-4">
      <div className="flex w-[100%] flex-col items-start justify-center gap-5 p-6 lg:w-[70%]">
        <div className="flex w-[100%] flex-col gap-4 lg:mt-4">
          <div className="relative flex items-center justify-center">
            <button className="absolute bottom-0 left-2 top-0 border-none bg-transparent">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold tracking-tight">Montar treino</h1>
          </div>
          <div className="flex flex-col gap-2">
            <p>Nome</p>
            <Input {...register('name')} placeholder="Treino A" />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex w-[100%] flex-col gap-2 lg:w-[50%]">
              <p>Tipo</p>
              <Select onValueChange={setSelectedType} value={selectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Hipertrofia" />
                </SelectTrigger>
                <SelectContent className="max-h-40">
                  {typeTraining.map((type) => (
                    <SelectItem key={type.id} value={type.name} >
                      {type.name}
                    </SelectItem>
                  ))}
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
