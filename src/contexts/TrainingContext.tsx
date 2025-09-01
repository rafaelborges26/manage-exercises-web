import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'

import {
  ExerciseSeriesProps,
  SeriesProps,
  TrainingExercise,
  TrainingProps,
} from '@/interfaces/exercises'
import {
  InitialValueSessions,
  initialValuesExercise,
  InitialValuesTraining,
} from '@/utils/initialValues'
import { api } from '@/services/api'
import { Routes } from '@/constants/routes'
import { SessionTrainingProps } from '@/interfaces/sessions'

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
  createTrainingExercise: () => void
  getTrainingsUser: () => void
  startSessionTraining: (idTraining: string) => void
  sessionTraining: SessionTrainingProps
  updateTrainingSeries: () => void
  updateSessionTraining: (idTraining: string, currentSeries: number, repetition: number, weight: number) => void

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

  const [sessionTraining, setSessionTraining] = useState<SessionTrainingProps>(InitialValueSessions)

  console.log(sessionTraining, 'sessionTraining')


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

  const createTrainingExercise = () => {
  setTrainingsExercises((prev) => {
    const newValue = [
      ...prev,
      {
        exercises: exercises,
        ...training
      }
    ]

    // salva no localstorage
    localStorage.setItem("@Fitness.training", JSON.stringify(newValue))

    return newValue
  })

  resetValues()
}


  const getTrainingsUser = async () => {
    const { data } = await api.get<TrainingExercise[]>(`api/${Routes.trainings}`)
    
        console.log(data)    
        setTrainingsExercises(data)
  }

  const updateTrainingSeries = () => {
    //disparar request de update apos clicar em pronto e ao navegar para a proxima serie se tiver alteracao

    //pegar dados do sessionTraining e disparar apos clicar no pronto
    
    //const { data } = await api.put(`api/${Routes.updateExerciseSeries}`,
    //{
    //  idTraining,
    //  currentSeries,
    //  repetition,
    //  weight
    //})

  }

  const updateSessionTraining = async (idTraining: string, currentSeries: number, newRepetition: number, newWeight: number) => {
    console.log(idTraining, 'IDTRAINING')
    //alterar as series do session e armazenar no session, apos clicar no botao de pronto disparar


     setSessionTraining((prevTraining) => {
      // Encontra o exercício específico
      const updatedExercises = prevTraining?.exercises.map((exercise) => {
        if (exercise.id === idTraining) {
          // Atualiza a série específica
          const updatedSeries = exercise.series.map((series) => {
            if (series.currentSeries === currentSeries) {
              return { ...series, repetition: newRepetition, weight: newWeight };
            }
            return series;
          });
          return { ...exercise, series: updatedSeries };
        }
        return exercise;
      });

      console.log(updatedExercises, 'updatedExercises')

      return { ...prevTraining, exercises: updatedExercises };
    });
  };

  const startSessionTraining = (idTraining: string) => {
    const trainingFound = trainingsExercises.find(trainingSelected => trainingSelected.id === idTraining)

    if(trainingFound){
      setSessionTraining({
        id: new Date().toISOString(), //tratar no backend o id
        exercises: trainingFound.exercises,
        name: trainingFound.name,
        startDate: new Date()
      })
    }
  }

  const resetValues = () => {
    setTraining(InitialValuesTraining)
    setExercise(initialValuesExercise)
    setExercises([])
  }

  useEffect(() => {
    const trainingStorage = localStorage.getItem("@Fitness.training")
    if (trainingStorage) {
      setTrainingsExercises(JSON.parse(trainingStorage))
    }
  }, [])

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
        createTrainingExercise,
        getTrainingsUser,
        startSessionTraining,
        updateTrainingSeries,
        updateSessionTraining,
        sessionTraining
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
