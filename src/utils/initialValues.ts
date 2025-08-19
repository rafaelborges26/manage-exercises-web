import {
  ExerciseSeriesProps,
  SeriesProps,
  TrainingProps,
} from '@/interfaces/exercises'
import { SessionTrainingProps } from '@/interfaces/sessions'

export const InitialValuesSeries: SeriesProps = {
  currentSeries: 1,
  repetition: 0,
  weight: 0,
}

export const initialValuesExercise: ExerciseSeriesProps = {
  id: '',
  name: '',
  muscleGroup: '',
  image: '',
  series: [InitialValuesSeries],
  idTraining: '0',
}

export const InitialValuesTraining: TrainingProps = {
  id: '',
  name: '',
  type: '',
  sessions: 0,
}

export const InitialValueSessions: SessionTrainingProps = {
  id: '',
  name: '',
  exercises: [initialValuesExercise],
  startDate: new Date() 
}
