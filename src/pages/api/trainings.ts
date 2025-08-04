// src/pages/api/exercises.ts
import { NextApiRequest, NextApiResponse } from 'next'

const training = [
  {
    "exercises": [
      {
        "id": "bench_press",
        "name": "Supino Reto",
        "muscleGroup": "Peito",
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        "series": [
          {
            "currentSeries": 1,
            "repetition": 10,
            "weight": 20
          },
          {
            "currentSeries": 2,
            "repetition": 10,
            "weight": 24
          },
          {
            "currentSeries": 3,
            "repetition": 12,
            "weight": 15
          }
        ],
        "idTraining": "2025-08-04T18:23:59.477Z"
      },
      {
        "id": "push_up",
        "name": "Flexão de Braço",
        "muscleGroup": "Peito",
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        "series": [
          {
            "currentSeries": 1,
            "repetition": 10,
            "weight": 12
          },
          {
            "currentSeries": 2,
            "repetition": 12,
            "weight": 10
          },
          {
            "currentSeries": 3,
            "repetition": 12,
            "weight": 10
          }
        ],
        "idTraining": "2025-08-04T18:23:59.477Z"
      }
    ],
    "id": "2025-08-04T18:23:59.477Z",
    "name": "Treino A",
    "type": "",
    "sessions": 10
  },
  {
    "exercises": [
      {
        "id": "seated_row",
        "name": "Remada Sentada",
        "muscleGroup": "Costas",
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        "series": [
          {
            "currentSeries": 1,
            "repetition": 9,
            "weight": 11
          },
          {
            "currentSeries": 2,
            "repetition": 13,
            "weight": 15
          },
          {
            "currentSeries": 3,
            "repetition": 12,
            "weight": 14
          }
        ],
        "idTraining": "2025-08-04T18:26:14.926Z"
      },
      {
        "id": "pull_up",
        "name": "Barra Fixa",
        "muscleGroup": "Costas",
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
        "series": [
          {
            "currentSeries": 1,
            "repetition": 10,
            "weight": 13
          },
          {
            "currentSeries": 2,
            "repetition": 10,
            "weight": 15
          }
        ],
        "idTraining": "2025-08-04T18:26:14.926Z"
      }
    ],
    "id": "2025-08-04T18:26:14.926Z",
    "name": "Treino B",
    "type": "",
    "sessions": 10
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  res.status(200).json(training)
}
