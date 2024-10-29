import {
  ExerciseSeriesProps,
  SeriesProps,
  TrainingProps,
} from '@/interfaces/exercises'

export const InitialValuesSeries: SeriesProps = {
  currentSeries: 1,
  repetition: 0,
  weight: 0,
}

export const initialValuesExercise: ExerciseSeriesProps = {
  id: '',
  name: '',
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
