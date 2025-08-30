// src/pages/api/exercises.ts
import { NextApiRequest, NextApiResponse } from 'next'

const exercises = [
  { id: 'bench_press', name: 'Supino Reto', muscleGroup: 'Peito' },
  { id: 'incline_bench_press', name: 'Supino Inclinado', muscleGroup: 'Peito' },
  { id: 'pec_deck', name: 'Crucifixo Máquina (Peck Deck)', muscleGroup: 'Peito' },
  { id: 'push_up', name: 'Flexão de Braço', muscleGroup: 'Peito' },
  { id: 'lat_pull_down', name: 'Puxada na Frente (Pulldown)', muscleGroup: 'Costas' },
  { id: 'seated_row', name: 'Remada Sentada', muscleGroup: 'Costas' },
  { id: 'deadlift', name: 'Levantamento Terra', muscleGroup: 'Costas' },
  { id: 'pull_up', name: 'Barra Fixa', muscleGroup: 'Costas' },
  { id: 'bicep_curl', name: 'Rosca Direta', muscleGroup: 'Braço (Bíceps)' },
  { id: 'hammer_curl', name: 'Rosca Martelo', muscleGroup: 'Braço (Bíceps)' },
  { id: 'tricep_pushdown', name: 'Tríceps na Polia', muscleGroup: 'Braço (Tríceps)' },
  { id: 'tricep_dip', name: 'Mergulho em Paralelas', muscleGroup: 'Braço (Tríceps)' },
  { id: 'shoulder_press', name: 'Desenvolvimento com Halteres', muscleGroup: 'Ombros' },
  { id: 'lateral_raise', name: 'Elevação Lateral', muscleGroup: 'Ombros' },
  { id: 'front_raise', name: 'Elevação Frontal', muscleGroup: 'Ombros' },
  { id: 'upright_row', name: 'Remada Alta', muscleGroup: 'Ombros' },
  { id: 'squat', name: 'Agachamento Livre', muscleGroup: 'Pernas' },
  { id: 'leg_press', name: 'Leg Press', muscleGroup: 'Pernas' },
  { id: 'leg_extension', name: 'Extensora', muscleGroup: 'Pernas' },
  { id: 'leg_curl', name: 'Flexora', muscleGroup: 'Pernas' },
  { id: 'calf_raise', name: 'Elevação de Panturrilha', muscleGroup: 'Pernas' },
  { id: 'plank', name: 'Prancha Abdominal', muscleGroup: 'Abdômen' },
  { id: 'crunch', name: 'Abdominal Crunch', muscleGroup: 'Abdômen' },
  { id: 'leg_raise', name: 'Elevação de Pernas', muscleGroup: 'Abdômen' },

  // novos dos treinos
  { id: 'barbell_bent_over_row', name: 'Remada Curvada com Barra (Pronada)', muscleGroup: 'Costas' },
  { id: 'neutral_grip_lat_pull', name: 'Puxada Alta com Pegada Neutra (Triângulo)', muscleGroup: 'Costas' },
  { id: 'one_arm_dumbbell_row', name: 'Remada Serrote com Halter', muscleGroup: 'Costas' },
  { id: 'ez_bar_curl', name: 'Rosca Direta com Barra W', muscleGroup: 'Braço (Bíceps)' },
  { id: 'sit_up', name: 'Abdominal Remador', muscleGroup: 'Abdômen' },
  { id: 'incline_dumbbell_press', name: 'Supino Inclinado com Halteres', muscleGroup: 'Peito' },
  { id: 'flat_dumbbell_fly', name: 'Crucifixo Plano (Máquina ou Halteres)', muscleGroup: 'Peito' },
  { id: 'military_press_dumbbell', name: 'Desenvolvimento Militar com Halteres (Sentado)', muscleGroup: 'Ombros' },
  { id: 'skull_crusher', name: 'Tríceps Testa com Barra W/Halteres', muscleGroup: 'Braço (Tríceps)' },
  { id: 'tricep_rope_pushdown', name: 'Tríceps Corda no Pulley', muscleGroup: 'Braço (Tríceps)' },
  { id: 'smith_lunge', name: 'Afundo no Smith (ou com Halteres)', muscleGroup: 'Pernas' },
  { id: 'romanian_deadlift', name: 'Levantamento Terra RDL (Romanian Deadlift)', muscleGroup: 'Posterior' },
  { id: 'lying_leg_curl', name: 'Mesa Flexora', muscleGroup: 'Posterior' },
  { id: 'seated_leg_curl', name: 'Cadeira Flexora', muscleGroup: 'Posterior' },
  { id: 'reverse_fly', name: 'Elevação Posterior (Crucifixo Inverso)', muscleGroup: 'Ombros (Posterior)' },
  { id: 'face_pull', name: 'Face Pull com Corda', muscleGroup: 'Ombros (Rotação)' },
  { id: 'seated_calf_raise', name: 'Panturrilha Sentado', muscleGroup: 'Pernas' },
  { id: 'external_rotation', name: 'Rotação Externa de Ombro', muscleGroup: 'Ombros (Manguito)' },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { muscleGroup } = req.query

  if (!muscleGroup || typeof muscleGroup !== 'string') {
    return res
      .status(400)
      .json({ error: 'Parâmetro muscleGroup é obrigatório' })
  }

  const filtered = exercises.filter((ex) =>
    ex.muscleGroup.toLowerCase().includes(muscleGroup.toLowerCase()),
  )

  res.status(200).json(filtered)
}
