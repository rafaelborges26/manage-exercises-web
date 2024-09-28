export interface ExerciseProps {
  id: string
  name: string
  description: string
  image?: string
  series: {
    currentSeries: number
    repetition: number
    weight: number
  }[]
}
