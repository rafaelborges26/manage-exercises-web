import { ExerciseSeriesProps, SeriesProps, TrainingExercise } from "./exercises"

export interface SessionTrainingProps {
    id: string
    exercises: ExerciseSeriesProps[]
    startDate: Date
    name: string
}