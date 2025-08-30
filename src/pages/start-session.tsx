import { ErrorMessage } from '@/components/errorMessage';
import { useTraining } from '@/contexts/TrainingContext';
import { api } from '@/services/api';
import { Check, Dumbbell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button';
import { ExerciseSeriesProps, SeriesProps } from '@/interfaces/exercises';
import { initialValuesExercise, InitialValuesSeries } from '@/utils/initialValues';

export default function StartTraining() {

const { push } = useRouter()
  
const { sessionTraining, updateSessionTraining } = useTraining()

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSerieIndex, setCurrentSerieIndex] = useState(0);
  const [currentSerie, setCurrentSerie] = useState<SeriesProps>(InitialValuesSeries)
  const [timer, setTimer] = useState(0);

  const currentExercise = sessionTraining.exercises[currentExerciseIndex];
  const nextExercise = sessionTraining.exercises[currentExerciseIndex + 1];

  // Timer incrementa a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCheck = () => {
    if (currentSerieIndex < currentExercise.series.length - 1) {
      // Vai para próxima série do mesmo exercício
      setCurrentSerieIndex((prev) => prev + 1);
      setCurrentSerie(sessionTraining.exercises[currentExerciseIndex].series[currentSerieIndex + 1]);
    } else if (currentExerciseIndex < sessionTraining.exercises.length - 1) {
      // Vai para próximo exercício
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSerieIndex(0);
    } else {
      // Finalizou treino
      //alert("Treino finalizado 🎉");
      //ir para tela de treino concluido
    }
    setTimer(0); // reseta timer a cada série
  };

  const updateRepetitionField = (newRepetition: number) => {
    updateSessionTraining(currentExerciseIndex.toString(), currentSerieIndex, newRepetition, currentSerie.weight)
  }

  const updateWeightField = (newWeight: number) => {
    updateSessionTraining(currentExerciseIndex.toString(), currentSerieIndex, currentSerie.repetition, newWeight)
  }


  return (
    <div className="flex w-full flex-col bg-white dark:bg-zinc-900 h-[100%]">
  {/* Header */}
  <div className="sticky top-0 z-50 flex flex-col w-full bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 p-4">
    <h2 className="text-lg lg:text-xl font-bold text-center text-gray-900 dark:text-white">
      {currentExercise?.name || "Treino"}
    </h2>

    {/* Barra de progresso */}
    <div className="w-full h-2 mt-3 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all"
        style={{
          width: `${
            ((currentExerciseIndex + 1) / sessionTraining.exercises.length) * 100
          }%`,
        }}
      />
    </div>
  </div>

  {/* Conteúdo principal */}
  <div className="flex flex-col items-center justify-center flex-1 gap-8 p-6">
    {/* Info série */}
    <div className="text-center space-y-3 w-full max-w-[360px]">
      <p className="text-sm lg:text-base font-medium text-gray-600 dark:text-gray-400">
        Série {currentSerieIndex + 1} de {currentExercise?.series.length}
      </p>

      {/* Aqui entram inputs editáveis no lugar dos labels */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Repetições
          </span>
          <input
            type="number"
            value={sessionTraining.exercises[currentExerciseIndex].series[currentSerieIndex].repetition}
            onChange={(e) =>
              updateRepetitionField(Number(e.target.value))
            }
            className="w-20 rounded-lg border border-gray-300 dark:border-zinc-700 p-2 text-center font-semibold text-lg text-gray-900 dark:text-white bg-gray-50 dark:bg-zinc-800"
          />
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">Peso (kg)</span>
          <input
            type="number"
            value={sessionTraining.exercises[currentExerciseIndex].series[currentSerieIndex].weight}
            onChange={(e) =>
              updateWeightField(Number(e.target.value))
            }
            className="w-20 rounded-lg border border-gray-300 dark:border-zinc-700 p-2 text-center font-semibold text-lg text-gray-900 dark:text-white bg-gray-50 dark:bg-zinc-800"
          />
        </div>
      </div>
    </div>

    {/* Timer circular */}
    <div className="relative flex items-center justify-center">
      <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-full border-8 border-green-500 flex items-center justify-center">
        <span className="text-2xl lg:text-3xl font-mono font-bold text-green-600">
          {String(Math.floor(timer / 60)).padStart(2, "0")}:
          {String(timer % 60).padStart(2, "0")}
        </span>
      </div>
    </div>
  </div>

  {/* Próximo exercício */}
  {nextExercise && (
    <div className="p-4 text-center border-t border-gray-200 dark:border-zinc-700">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Próximo:{" "}
        <span className="font-semibold text-gray-800 dark:text-gray-200">
          {nextExercise.name}
        </span>
      </p>
    </div>
  )}

  {/* Botão Concluir */}
  <div className="w-full p-4">
    <Button
      onClick={handleCheck}
      className="w-full h-14 rounded-xl bg-green-500 text-white text-base lg:text-lg font-bold hover:bg-green-600 flex items-center justify-center gap-2"
    >
      <Check className="w-6 h-6" /> Concluir Série
    </Button>
  </div>
</div>  
  )
}
