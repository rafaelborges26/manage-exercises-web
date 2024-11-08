import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'

import { SelectOptionsProps } from '@/pages/list-exercise'

import { Badge } from './ui/badge'
import { Button } from './ui/button'

interface MultiSelectProps {
  options: {
    idExercise: string
    nameExercise: string
  }[]
  // Define o tipo das opções
}

const MultiSelect = ({ options }: MultiSelectProps) => {
  const { push } = useRouter()

  const [selectedOptions, setSelectedOptions] = useState<SelectOptionsProps[]>(
    [],
  )
  const [isOpenSelect, setIsOpenSelect] = useState(false)

  const handleSelect = (option: SelectOptionsProps) => {
    // Atualiza o estado com base na seleção/deseleção da opção
    setSelectedOptions(
      (prevSelected) =>
        prevSelected.includes(option)
          ? prevSelected.filter((item) => item.idExercise !== option.idExercise) // Remove a opção
          : [...prevSelected, option], // Adiciona a opção
    )
  }

  const handleOpenSelect = () => {
    setIsOpenSelect((state) => !state)
  }

  const isSelected = (option: SelectOptionsProps): boolean =>
    selectedOptions.includes(option)

  return (
    <div className="relative">
      <button
        onClick={handleOpenSelect}
        className="p-2; flex w-[100%] cursor-pointer items-center justify-between rounded border border-solid p-2 text-sm active:border-[#ccc]"
      >
        Selecione opções
        <ChevronDown width={20} height={20} className="gray-500" />
      </button>
      {isOpenSelect && (
        <div className="left-0 top-full z-[1] max-h-[150px] w-full rounded border border-solid bg-transparent text-start focus:border-[#ccc]">
          {options.map((option) => (
            <label
              key={option.idExercise}
              className="flex cursor-pointer items-center gap-1 p-2 text-sm hover:bg-secondary"
            >
              <input
                type="checkbox"
                checked={isSelected(option)}
                onChange={() => handleSelect(option)}
              />
              {option.nameExercise}
            </label>
          ))}
        </div>
      )}
      <div className="mt-4 flex w-[50%] flex-col gap-2">
        {selectedOptions.map((option) => (
          <Button
            variant="outline"
            className="items-center justify-center p-1 text-center text-sm"
            onClick={() => push(`/selection-exercise/${option.idExercise}`)}
          >
            {option.nameExercise}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default MultiSelect
