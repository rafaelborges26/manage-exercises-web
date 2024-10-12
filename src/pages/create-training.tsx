import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import emptyImage from '@/assets/images/empty.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTraining } from '@/contexts/TrainingContext'

export default function CreateTraining() {
  const { createTrainingDispatch } = useTraining()

  const createTrainingSchema = z.object({
    name: z.string(),
    image: z.string(),
    description: z.string().email(),
    observation: z.string(),
  })

  type CreateTrainingSchema = z.infer<typeof createTrainingSchema>

  const { register, handleSubmit, getValues, setValue } =
    useForm<CreateTrainingSchema>({
      resolver: zodResolver(createTrainingSchema),
      defaultValues: {
        name: '',
        image: '',
        description: '',
        observation: '',
      },
    })

  console.log(getValues('image'), 'name')

  const router = useRouter()

  const [base64Image, setBase64Image] = useState('')

  // Função para lidar com a mudança (upload) da imagem
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // Obtém o arquivo
    const reader = new FileReader() // Instancia o FileReader

    reader.onloadend = () => {
      const imageBase64 = reader.result as string
      setBase64Image(imageBase64) // Define a imagem codificada como base64
      setValue('image', imageBase64)
    }

    if (file) {
      reader.readAsDataURL(file) // Converte a imagem para Base64
    }
  }

  const handleCreateTraining = () => {
    console.log('data')

    createTrainingDispatch({
      description: getValues('description'),
      name: getValues('name'),
      image: getValues('image'),
      id: new Date().toISOString(),
    })

    router.push('create-exercise')
  }

  return (
    <div className="relative flex h-[100%] w-[100%] max-w-[1240px] flex-col items-center gap-4">
      <div className="flex w-[100%] flex-col items-start justify-center gap-5 p-6 lg:w-[70%]">
        <div className="lg:flex lg:w-[100%] lg:items-center lg:justify-start">
          <Input {...register('name')} placeholder="Digite o nome do Treino" />
        </div>

        <div className="flex w-[100%] items-center">
          <label
            htmlFor="file-input"
            className="flex w-[100%] items-center justify-center"
          >
            <Image
              src={base64Image || emptyImage}
              alt="Placeholder"
              width={240}
              height={300}
              className="h-[240px] w-[100%] cursor-pointer lg:h-[300px] lg:w-[80%]"
            />
          </label>
        </div>

        <input
          {...register('image')}
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        <div className="flex w-[100%] flex-col gap-4 lg:mt-4">
          <div className="flex flex-col gap-2">
            <p>Descrição:</p>
            <Input
              {...register('description')}
              id="description"
              placeholder="Digite a descrição do treino"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Observações importantes:</p>
            <Input
              {...register('observation')}
              id="observation"
              placeholder="Digite informações importantes sobre o treino"
            />
          </div>
        </div>
        <div className="absolute bottom-[1rem] flex w-[88%] lg:relative lg:mt-4">
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
