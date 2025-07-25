import { Dispatch, SetStateAction } from 'react'

export interface SeriesProps {
  currentSeries: number
  repetition: number
  weight: number
}

export interface ExerciseSeriesProps {
  id: string
  name: string
  image: string
  series: SeriesProps[]
  idTraining: string
  muscleGroup: string
}

export interface TrainingProps {
  id: string
  name: string
  type?: string
  sessions?: number
}

export interface TrainingExercise {
  trainingDetails: TrainingProps,
  exercises: ExerciseSeriesProps[]
}
