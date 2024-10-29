import { createContext, type ReactNode, useContext, useState } from 'react'

import {
  ExerciseSeriesProps,
  SeriesProps,
  TrainingProps,
} from '@/interfaces/exercises'
import {
  initialValuesExercise,
  InitialValuesTraining,
} from '@/utils/initialValues'

// import { initialAllStoresGroup } from '../utils/initialValues'

type TypeTrainingContext = {
  training: TrainingProps
  exercises: ExerciseSeriesProps[]
  createTrainingDispatch: (data: TrainingProps) => void
  createExerciseDispatch: (data: ExerciseSeriesProps) => void
}

type TypePropsAccompaniment = {
  children: ReactNode
}

const TrainingContext = createContext({} as TypeTrainingContext)

export function TrainingProvider({ children }: TypePropsAccompaniment) {
  const [training, setTraining] = useState<TrainingProps>(InitialValuesTraining)
  const [exercises, setExercises] = useState<ExerciseSeriesProps[]>([])

  const createTrainingDispatch = ({
    id,
    name,
    type,
    sessions,
  }: TrainingProps) => {
    setTraining({
      id,
      name,
      type,
      sessions,
    })
  }

  const createExerciseDispatch = ({
    id,
    name,
    image,
    series,
    idTraining,
  }: ExerciseSeriesProps) => {
    console.log(id, name, series, idTraining, 'data arrived')

    setExercises((prev) => [
      ...prev,
      {
        id,
        name,
        image,
        series,
        idTraining,
      },
    ])
  }

  return (
    <TrainingContext.Provider
      value={{
        training,
        exercises,
        createTrainingDispatch,
        createExerciseDispatch,
      }}
    >
      {children}
    </TrainingContext.Provider>
  )
}

// export Context as Hook function
export function useTraining() {
  return useContext(TrainingContext)
}
