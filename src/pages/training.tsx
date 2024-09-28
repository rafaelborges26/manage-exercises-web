import Image from 'next/image'
import { useState } from 'react'

import { Card } from '@/components/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ExerciseProps } from '@/interfaces/exercises'

export default function Training() {
  const exercises: ExerciseProps[] = [
    {
      id: '1',
      name: 'Supino reto',
      description: 'supino com barra dropset',
      series: [
        {
          currentSeries: 1,
          repetition: 10,
          weight: 20,
        },
        {
          currentSeries: 2,
          repetition: 10,
          weight: 20,
        },
      ],
    },
    {
      id: '2',
      name: 'Supino inclinado',
      description: 'supino inclinado com barra',
      image:
        'https://i.pinimg.com/originals/5c/c3/aa/5cc3aad2f41f1ab49baddb11bbd21e90.jpg',
      series: [
        {
          currentSeries: 1,
          repetition: 12,
          weight: 10,
        },
        {
          currentSeries: 2,
          repetition: 12,
          weight: 10,
        },
        {
          currentSeries: 3,
          repetition: 8,
          weight: 12,
        },
      ],
    },
  ]

  return (
    <div className="flex h-[100%] w-[100%] max-w-[1240px] flex-col items-center gap-4 p-6">
      <Accordion type="multiple" className="w-[100%]">
        <h5 className="text-base font-bold lg:mb-2 lg:text-2xl">Mês 1</h5>
        <AccordionItem value="item-1">
          <AccordionTrigger>Treino A</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              {exercises.map((exercise) => (
                <Card exercise={exercise}>Teste</Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="multiple" className="w-[100%]">
        <AccordionItem value="item-1">
          <AccordionTrigger>Treino B</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              {exercises.map((exercise) => (
                <Card exercise={exercise}>Teste</Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="multiple" className="w-[100%]">
        <AccordionItem value="item-1">
          <AccordionTrigger>Treino C</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              {exercises.map((exercise) => (
                <Card exercise={exercise}>Teste</Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
