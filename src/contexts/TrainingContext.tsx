import { createContext, type ReactNode, useContext, useState } from 'react'

import {
  ExerciseSeriesProps,
  SeriesProps,
  TrainingExercise,
  TrainingProps,
} from '@/interfaces/exercises'
import {
  initialValuesExercise,
  InitialValuesTraining,
} from '@/utils/initialValues'
import { api } from '@/services/api'
import { Routes } from '@/constants/routes'

type TypeTrainingContext = {
  training: TrainingProps
  exercise: ExerciseSeriesProps
  exercises: ExerciseSeriesProps[]
  trainingsExercises: TrainingExercise[]
  createTrainingDispatch: (data: TrainingProps) => void
  createExerciseDispatch: (data: ExerciseSeriesProps) => void
  createExercisesDispatch: (data: ExerciseSeriesProps) => void
  deleteExerciseDispatch: (idExercise: string) => void
  selectExercise: (idExercise: string) => void
  addNewTrainingExercise: () => void
  getTrainingsUser: () => void

}

type TypePropsAccompaniment = {
  children: ReactNode
}

const TrainingContext = createContext({} as TypeTrainingContext)

export function TrainingProvider({ children }: TypePropsAccompaniment) {
  const [training, setTraining] = useState<TrainingProps>(InitialValuesTraining)
  
  const [exercise, setExercise] = useState<ExerciseSeriesProps>(
    initialValuesExercise,
  )
  const [exercises, setExercises] = useState<ExerciseSeriesProps[]>([])

  const [trainingsExercises, setTrainingsExercises] = useState<TrainingExercise[]>([])

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
    muscleGroup,
    image,
    series,
    idTraining,
  }: ExerciseSeriesProps) => {
    console.log(id, name, series, idTraining, 'data arrived')

    setExercise({
      id,
      name,
      muscleGroup,
      image,
      series,
      idTraining,
    })
  }

  const createExercisesDispatch = ({
    id,
    name,
    muscleGroup,
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
        muscleGroup,
        image,
        series,
        idTraining,
      },
    ])
  }

  const deleteExerciseDispatch = (idExercise: string) => {
    const newExercise = exercises.filter((ex) => ex.id !== idExercise)

    setExercises(newExercise)
  }

  const selectExercise = (idExercise: string) => {
    const exerciseFound = exercises.find((ex) => ex.id === idExercise)

    if (exerciseFound) {
      setExercise(exerciseFound)
    }
  }

  const addNewTrainingExercise = () => {
    setTrainingsExercises((prev) => [
      ...prev,
      {
        exercises: exercises,
        ...training
      }
    ])

    resetValues()
  }

  const getTrainingsUser = async () => {
    const { data } = await api.get<TrainingExercise[]>(`api/${Routes.trainings}`)
    
        console.log(data)    
        setTrainingsExercises(data)
  }

  const resetValues = () => {
    setTraining(InitialValuesTraining)
    setExercise(initialValuesExercise)
    setExercises([])
  }

  return (
    <TrainingContext.Provider
      value={{
        training,
        exercise,
        exercises,
        trainingsExercises,
        createTrainingDispatch,
        createExerciseDispatch,
        createExercisesDispatch,
        deleteExerciseDispatch,
        selectExercise,
        addNewTrainingExercise,
        getTrainingsUser,
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
