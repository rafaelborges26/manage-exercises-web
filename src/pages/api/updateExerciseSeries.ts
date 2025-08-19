import { NextApiRequest, NextApiResponse } from 'next';

// Dados mock (simulando um banco de dados)
let workoutData = {
  id: "1",
  name: "Treino de Peito",
  series: [
    {
      currentSeries: 1,
      repetition: 10,
      weight: 20
    },
    {
      currentSeries: 2,
      repetition: 10,
      weight: 24
    },
    {
      currentSeries: 3,
      repetition: 12,
      weight: 15
    }
  ]
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { currentSeries, repetition, weight } = req.body;

    // Encontra a série pelo currentSeries
    const seriesToUpdate = workoutData.series.find(
      (s) => s.currentSeries === currentSeries
    );

    if (!seriesToUpdate) {
      return res.status(404).json({ error: "Série não encontrada." });
    }

    // Atualiza os campos
    seriesToUpdate.repetition = repetition;
    seriesToUpdate.weight = weight;

    return res.status(200).json({
      message: "Série atualizada com sucesso!",
      updatedWorkout: workoutData
    });
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).json({ error: `Método ${req.method} não permitido.` });
  }
}