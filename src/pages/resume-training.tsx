import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, DumbbellIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { SeriesProps } from '@/interfaces/exercises'
import { Stepper } from '@/components/stepper'

interface RepetitionsProps {
  max: number, min: number
}

export default function ChooseExercises() {
  const router = useRouter()

  const { exercises, training, addNewTrainingExercise } = useTraining()

  const formatSeries = useCallback((series: SeriesProps[]) => {

    const seriesQuantity = series.length
    
    const repetitionQuantity = series.reduce((acumulador: RepetitionsProps, serie) => {
      acumulador = {
        max: serie.repetition > acumulador.max ? serie.repetition : acumulador.max,
        min: serie.repetition < acumulador.min ? serie.repetition : acumulador.min,
      }

      return acumulador
      
    }, {
      max: 0,
      min: 99,
    })

    console.log(repetitionQuantity, 'testes')

  if(repetitionQuantity.max === repetitionQuantity.min){
    return `${seriesQuantity} séries de ${repetitionQuantity.min} repetições`
  }
  
  return `${seriesQuantity} séries de ${repetitionQuantity.min} a ${repetitionQuantity.max} repetições`
  },[exercises])

  const addTrainingExercise = () => {
    addNewTrainingExercise()
    router.push('create-training')
  }

  const handleConclude = () => {
    addNewTrainingExercise()
    router.push('home')
  }

  return (
    <div className="relative flex h-full w-full max-w-[1240px] flex-col items-center px-4">
  <div className="w-full lg:w-[70%] flex flex-col gap-6 pb-2">

    {/* Cabeçalho */}
    <div className="flex items-center justify-between w-full">
      <button
        onClick={() => {}}
        className="text-gray-500 hover:text-black dark:hover:text-white"
      >
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-xl font-bold text-center flex-1">Revisar treino</h1>
      <div className="w-6" /> {/* espaço para equilibrar visualmente */}
    </div>

    {/* Etapa do processo */}
    <Stepper step={3} total={3} label="Passo 3 de 3" />

    {/* Bloco principal */}
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-900">{training.name}</h2>

      <p className="text-sm text-gray-700">
        <span className="font-medium">Finalidade:</span> {training.type}
      </p>

      {/* Lista de Exercícios */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold text-gray-800">Exercícios:</h3>
        <ul className="flex flex-col gap-4 overflow-y-scroll">
          {exercises.map((exercise) => (
            <li
              key={exercise.id}
              className="flex flex-col gap-1 border rounded-xl p-3 shadow-sm bg-white"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base">{exercise.name}</span>
                <Badge variant="outline">{exercise.muscleGroup}</Badge>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatSeries(exercise.series)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Ações */}
    <div className="flex flex-col-reverse gap-4 pt-6 lg:flex-row absolute bottom-[0px] w-[92%] lg:w-[98%] lg:relative lg:mt-4">
      <Button
        onClick={addTrainingExercise}
        className="flex-1 lg:w-44 bg-white text-green-600 border border-green-600 hover:bg-green-50 font-semibold rounded-xl py-3 text-base transition"
      >
        Adicionar próximo treino
      </Button>
      <Button
        className="flex-1 lg:w-44 bg-green-600 text-white hover:bg-green-700 font-semibold rounded-xl py-3 text-base transition"
        onClick={handleConclude}
      >
        Concluir
      </Button>
    </div>
  </div>
</div>

  )
}
