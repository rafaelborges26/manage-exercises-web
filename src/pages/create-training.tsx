import Image from 'next/image'
import { useState } from 'react'

import emptyImage from '@/assets/images/empty.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CreateTraining() {
  const [selectedImage, setSelectedImage] = useState('')

  // Função para lidar com a mudança (upload) da imagem
  const handleImageChange = (event) => {
    const file = event.target.files[0] // Pega o primeiro arquivo
    if (file && file.type.startsWith('image/')) {
      // Gera uma URL temporária para exibir a imagem
      setSelectedImage(URL.createObjectURL(file))
    } else {
      alert('Por favor, selecione um arquivo de imagem.')
    }
  }

  return (
    <div className="flex h-[100%] w-[100%] max-w-[1240px] flex-col items-center gap-4">
      <div className="flex w-[100%] flex-col items-start justify-center gap-5 p-6 lg:w-[70%]">
        <div className="lg:flex lg:w-[100%] lg:items-center lg:justify-start">
          <Input placeholder="Digite o nome do Treino" />
        </div>

        {/* Input para upload de arquivo */}
        {/* Div com a imagem placeholder ou a imagem carregada */}
        <div className="flex w-[100%] items-center">
          <label
            htmlFor="file-input"
            className="flex w-[100%] items-center justify-center"
          >
            <Image
              src={selectedImage || emptyImage} // Mostra a imagem selecionada ou o placeholder
              alt="Placeholder"
              width={240}
              height={300}
              className="h-[240px] w-[100%] cursor-pointer lg:h-[300px] lg:w-[80%]"
            />
          </label>
        </div>

        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <form className="flex w-[100%] flex-col gap-4 lg:mt-4">
          <div className="flex flex-col gap-2">
            <p>Descrição:</p>
            <Input id="email" placeholder="Digite a descrição do treino" />
          </div>
          <div className="flex flex-col gap-2">
            <p>Observações importantes:</p>
            <Input
              id="email"
              placeholder="Digite informações importantes sobre o treino"
            />
          </div>
        </form>
        <div className="mt-6 flex w-[100%] flex-row items-start justify-start lg:mt-0">
          <Button
            size={'lg'}
            className="w-[100%] bg-green-500 text-base font-bold hover:bg-green-600 lg:w-44"
          >
            Pronto
          </Button>
        </div>
      </div>
    </div>
  )
}
