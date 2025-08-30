import { XCircleIcon } from '@heroicons/react/24/outline'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/router'
import React, { ButtonHTMLAttributes, useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'

import { Button } from './ui/button'

export interface MultiSelectProps {
  options: OptionsProps[]
  optionsSelected?: OptionsProps[]
  buttonOnClick: (id: string) => void
  buttonRemove: (id: string) => void
}

export interface OptionsProps {
  id: string
  name: string
}

export const MultiSelect = ({
  options,
  optionsSelected,
  buttonOnClick,
  buttonRemove,
}: MultiSelectProps) => {
  const { push } = useRouter()

  const [selectedOptions, setSelectedOptions] = useState<OptionsProps[]>([])
  const [isOpenSelect, setIsOpenSelect] = useState(false)

  console.log(selectedOptions, 'selectedOptions')

  const handleSelect = (option: OptionsProps) => {
    // Atualiza o estado com base na seleção/deseleção da opção
    setSelectedOptions(
      (prevSelected) =>
        prevSelected.includes(option)
          ? prevSelected.filter((item) => item.id !== option.id) // Remove a opção
          : [...prevSelected, option], // Adiciona a opção
    )
  }

  const handleOpenSelect = () => {
    setIsOpenSelect((state) => !state)
  }

  const isSelected = (option: OptionsProps): boolean =>
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
        <div className="left-0 top-full z-[1] max-h-[150px] w-full rounded border border-solid bg-transparent text-start focus:border-[#ccc] overflow-auto">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-1 p-2 text-sm hover:bg-secondary"
            >
              <Checkbox
                checked={isSelected(option)}
                onCheckedChange={() => handleSelect(option)}
                onClick={() => buttonOnClick(option.id)}
              />
              {option.name}
            </label>
          ))}
        </div>
      )}

      <div className="mt-4 flex w-[100%] flex-col gap-2">
        {optionsSelected &&
          optionsSelected.map((option) => (
            <Button
              variant="outline"
              className="relative z-0 items-center justify-between border-2 px-2 text-center text-sm text-muted-foreground hover:text-foreground"
              onClick={() => buttonOnClick(option.id)}
              key={option.id}
            >
              {option.name}
              <span
                onClick={(e) => {
                  e.stopPropagation()
                  buttonRemove(option.id)
                }}
                className="absolute right-0 z-10 border-none bg-transparent p-1"
                aria-label="Remover"
              >
                <XCircleIcon
                  height={24}
                  width={24}
                  color="#000"
                  className="cursor-pointer text-gray-400 transition-colors hover:text-red-500"
                />
              </span>
            </Button>
          ))}
      </div>
    </div>
  )
}
