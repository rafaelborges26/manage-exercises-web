import { ErrorMessage } from '@/components/errorMessage';
import { useTraining } from '@/contexts/TrainingContext';
import { api } from '@/services/api';
import { Dumbbell } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router'

export default function StartTraining() {

      const { push } = useRouter()
  
const { trainingsExercises, getTrainingsUser, startSessionTraining } = useTraining()


  const handleNavigateExercise = (idExercise: string) => {
    startSessionTraining(idExercise)
    push(`/exercises/${idExercise}`)
  }

useEffect(() => {
    getTrainingsUser()
},[])

  return (
    <div className="relative flex h-full w-full max-w-[1240px] flex-col items-center px-4">
      <div className="w-full max-w-md">

    {trainingsExercises.length ? (
        <>
<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Iniciar treinos
        </h2>

        <ul className="flex flex-col gap-4">
            
          {trainingsExercises.map((training) => (
            <li
              key={training.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                  <Dumbbell className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {training.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {training.type}
                  </p>
                </div>
              </div>
              <button className="text-green-600 dark:text-green-400 font-semibold text-sm hover:underline" onClick={() => handleNavigateExercise(training.id)} >
                Iniciar
              </button>
            </li>
            
          ))}
        </ul>
        </>
    ) : (
        <ErrorMessage
            title='Algo deu errado'
            description='Não foi possível carregar os dados dos treinos. Tente novamente mais tarde.'
            redirectTo='/home'
            buttonLabel='Ir para o início'
        />
    ) }

        
      </div>
    </div>
  );
}
