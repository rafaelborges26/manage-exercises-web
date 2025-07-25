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

interface RepetitionsProps {
  max: number, min: number
}

export default function ChooseExercises() {
  const router = useRouter()

  const { exercises, training, addNewTrainingExercise } = useTraining()

  const backPageCreateTraining = () => {
    router.push('create-training')
  }

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
  }

  return (
    <div className="relative flex h-[100%] w-[100%] max-w-[1240px] flex-col items-center gap-4">
      <div className="flex w-[100%] flex-col items-start justify-center gap-5 p-6 lg:w-[70%]">
        <div className="flex w-[100%] flex-col gap-4 lg:mt-4">
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => {}}
              className="absolute bottom-0 left-2 top-0 border-none bg-transparent"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="inline-flex justify-center text-3xl font-bold tracking-tight">
              Revisar exercicios
            </h1>
          </div>

          <div>
            <h6 className="mb-2 text-2xl font-semibold tracking-tight">
              {training.name}
            </h6>

            <div className="mb-4 flex flex-row gap-1">
              <p>Finalidade:</p>
              <span>{training.type}</span>
            </div>

            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Exercícios:
            </h2>

            <div className="p-1">
              <ul className="flex flex-col gap-2 space-y-2 text-gray-700">
                {exercises.map((exercise) => (
                  <li key={exercise.id}>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{exercise.name}</h3>
                      </div>
                      <Badge variant="outline">{exercise.muscleGroup}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatSeries(exercise.series)}
                    </div>
                  </li>
                ))}
                </ul>

            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-0 w-full px-4 flex justify-between gap-4 lg:static lg:mt-6">
  <Button
    size="lg"
    className="flex-1 lg:w-44 bg-white text-green-600 border border-green-600 hover:bg-green-50 font-semibold rounded-xl py-3 text-base transition"
    type="button"
  >
    Adicionar outro treino
  </Button>
  <Button
    size="lg"
    className="flex-1 lg:w-44 bg-green-600 text-white hover:bg-green-700 font-semibold rounded-xl py-3 text-base transition"
    type="button"
    onClick={addTrainingExercise}
  >
    Concluir
  </Button>
</div>
      </div>
    </div>
  )
}
