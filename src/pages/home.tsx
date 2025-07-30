import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, DumbbellIcon, Play, PlusCircle } from 'lucide-react'

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

export default function Home() {
  const { push } = useRouter()

  const handleNavigateCreateTraining = () => {
    push('/create-training')
  }

  const handleNavigateTraining = () => {
    push('/start-training')
  }


   return (
   <div className="relative flex w-full justify-center bg-gradient-to-br from-gray-50 to-green-50 px-4 pb-8 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-[1240px] lg:w-[70%] flex flex-col gap-8">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Olá, Rafael 👋
          </h1>
        </div>

        {/* Bloco de ações principais */}
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleNavigateTraining}
            variant={'default'}
            className="h-[inherit] flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl text-lg font-semibold shadow-md"
          >
            <Play size={20} />
            Iniciar treino
          </Button>

          <Button
            onClick={handleNavigateCreateTraining}
            variant={'outline'}
            className="h-[inherit] flex items-center justify-center gap-2 w-full border text-green-600 hover:text-green-600 border-green-600 dark:text-green-400 dark:border-green-400 py-4 px-6 rounded-2xl text-lg font-semibold hover:bg-green-50 dark:bg-gray-600 dark:hover:bg-gray-700 transition"
          >
            <PlusCircle size={20} />
            Criar novo treino
          </Button>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-200 dark:border-gray-700" />

        {/* Seção de treinos recentes */}
        <div className="pt-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Treinos recentes
          </h2>
          <ul className="flex flex-col gap-4">
            {[
              { id: 1, name: "Treino A", weekday: "Segunda-feira" },
              { id: 2, name: "Treino B", weekday: "Quarta-feira" },
            ].map((treino) => (
              <li
                key={treino.id}
                className="flex items-center justify-between border rounded-2xl p-4 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-base">
                    {treino.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {treino.weekday}
                  </p>
                </div>
                <button className="text-green-600 dark:text-green-400 font-medium hover:underline text-sm">
                  Iniciar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
}

