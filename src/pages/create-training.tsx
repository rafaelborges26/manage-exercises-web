import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Minus, Plus } from 'lucide-react'
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
import { CounterInput } from '@/components/counter-input'
import { Stepper } from '@/components/stepper'

export default function CreateTraining() {
  const { createTrainingDispatch } = useTraining()

  const createTrainingSchema = z.object({
    name: z.string(),
    sessions: z.number(),
    type: z.string(),
  })

  type CreateTrainingSchema = z.infer<typeof createTrainingSchema>

  const [selectedType, setSelectedType] = useState('01')
  const [sessions, setSessions] = useState(0)


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

  //useEffect(() => {
  //  setValue('type', selectedType)
  //}, [getValues('type')])

  console.log(getValues('type'), 'type getvalue')
  console.log(watch('type'), 'type watch')

  return (
      <div className="relative flex h-[100%] w-[100%] max-w-[1240px] flex-col items-center gap-4">
      <div className="flex w-[100%] flex-col items-start justify-center gap-5 p-6 lg:w-[70%]">
        <div className="flex w-[100%] flex-col gap-4 lg:mt-4">
          <div className="flex items-center justify-between w-full">
  <button
    onClick={() => {}}
    className="text-gray-500 hover:text-black dark:hover:text-white"
  >
    <ArrowLeft size={24} />
  </button>
  <h1 className="text-xl font-semibold tracking-tight text-center flex-1">
    Montar treino
  </h1>
  <div className="w-6" />
</div>
          <Stepper step={1} total={3} label="Passo 1 de 3"/>

          <div className="flex flex-col gap-2">
            <p>Nome</p>
            <Input {...register('name')} placeholder="Peito e triceps" />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex w-[100%] flex-col gap-2 lg:w-[50%]">
              <p>Tipo</p>
              <Select onValueChange={setSelectedType} {...register('type')}>
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
              <CounterInput value={sessions} onChange={(val) => {
                setSessions(val)
                setValue('sessions', val)
              }} />            </div>
          </div>
        </div>
        <div className="absolute bottom-[0px] flex w-[88%] lg:relative lg:mt-4">
          <Button
            size={'lg'}
            className="w-[100%] text-base bg-green-600 text-white hover:bg-green-700 font-semibold rounded-xl py-3 transition lg:w-44"
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
