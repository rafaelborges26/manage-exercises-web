import type { NextApiRequest, NextApiResponse } from 'next'

// Tipo do exercício
type Exercise = {
  name: string
  purpose: string
  muscleGroup: string
  description: string
  image: string // Base64
}

// Mock de banco de dados ou origem dos dados
const mockExercises = [
  {
    id: 'bench_press',
    name: 'Supino Reto',
    purpose: 'Hipertrofia',
    muscleGroup: 'Peito',
    description:
      'Deite-se em um banco plano e empurre a barra para cima até estender os braços.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'incline_bench_press',
    name: 'Supino Inclinado',
    purpose: 'Hipertrofia',
    muscleGroup: 'Peito',
    description:
      'Deite-se em banco inclinado e empurre a barra para cima focando na parte superior do peitoral.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'pec_deck',
    name: 'Crucifixo Máquina (Peck Deck)',
    purpose: 'Hipertrofia',
    muscleGroup: 'Peito',
    description:
      'Sente-se na máquina e junte os braços à frente contraindo o peitoral.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'push_up',
    name: 'Flexão de Braço',
    purpose: 'Resistência',
    muscleGroup: 'Peito',
    description:
      'Com o corpo estendido, abaixe-se flexionando os cotovelos e empurre de volta.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'lat_pull_down',
    name: 'Puxada na Frente (Pulldown)',
    purpose: 'Hipertrofia',
    muscleGroup: 'Costas',
    description:
      'Puxe a barra para baixo em direção ao peito, ativando o dorsal.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'seated_row',
    name: 'Remada Sentada',
    purpose: 'Hipertrofia',
    muscleGroup: 'Costas',
    description:
      'Puxe a barra ou cabo na direção do abdômen mantendo as costas retas.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'deadlift',
    name: 'Levantamento Terra',
    purpose: 'Força',
    muscleGroup: 'Costas',
    description:
      'Levante a barra do chão mantendo a postura correta e a lombar estável.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'pull_up',
    name: 'Barra Fixa',
    purpose: 'Força',
    muscleGroup: 'Costas',
    description: 'Puxe o corpo para cima até o queixo ultrapassar a barra.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'bicep_curl',
    name: 'Rosca Direta',
    purpose: 'Hipertrofia',
    muscleGroup: 'Braço (Bíceps)',
    description:
      'Flexione os cotovelos elevando a barra ou halteres até a altura dos ombros.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'hammer_curl',
    name: 'Rosca Martelo',
    purpose: 'Hipertrofia',
    muscleGroup: 'Braço (Bíceps)',
    description:
      'Segure os halteres em posição neutra e flexione os cotovelos.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'tricep_pushdown',
    name: 'Tríceps na Polia',
    purpose: 'Hipertrofia',
    muscleGroup: 'Braço (Tríceps)',
    description: 'Empurre a barra ou corda para baixo estendendo os cotovelos.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'tricep_dip',
    name: 'Mergulho em Paralelas',
    purpose: 'Hipertrofia',
    muscleGroup: 'Braço (Tríceps)',
    description:
      'Flexione os cotovelos descendo o corpo e depois estenda-os novamente.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'shoulder_press',
    name: 'Desenvolvimento com Halteres',
    purpose: 'Hipertrofia',
    muscleGroup: 'Ombros',
    description:
      'Empurre os halteres para cima até estender os braços sobre a cabeça.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'lateral_raise',
    name: 'Elevação Lateral',
    purpose: 'Hipertrofia',
    muscleGroup: 'Ombros',
    description: 'Eleve os halteres lateralmente até a altura dos ombros.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'front_raise',
    name: 'Elevação Frontal',
    purpose: 'Hipertrofia',
    muscleGroup: 'Ombros',
    description: 'Levante os halteres à frente até a altura dos ombros.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'upright_row',
    name: 'Remada Alta',
    purpose: 'Hipertrofia',
    muscleGroup: 'Ombros',
    description:
      'Puxe a barra verticalmente até a altura do peito mantendo-a próxima ao corpo.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'squat',
    name: 'Agachamento Livre',
    purpose: 'Hipertrofia',
    muscleGroup: 'Pernas',
    description: 'Agache mantendo a postura e os joelhos alinhados aos pés.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'leg_press',
    name: 'Leg Press',
    purpose: 'Hipertrofia',
    muscleGroup: 'Pernas',
    description: 'Empurre a plataforma com os pés estendendo os joelhos.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'leg_extension',
    name: 'Extensora',
    purpose: 'Hipertrofia',
    muscleGroup: 'Pernas',
    description: 'Estenda os joelhos na máquina de cadeira extensora.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'leg_curl',
    name: 'Flexora',
    purpose: 'Hipertrofia',
    muscleGroup: 'Pernas',
    description:
      'Flexione os joelhos na máquina flexora ativando os posteriores.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'calf_raise',
    name: 'Elevação de Panturrilha',
    purpose: 'Hipertrofia',
    muscleGroup: 'Pernas',
    description: 'Eleve os calcanhares contraindo as panturrilhas.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'plank',
    name: 'Prancha Abdominal',
    purpose: 'Resistência',
    muscleGroup: 'Abdômen',
    description:
      'Mantenha o corpo reto apoiando-se nos antebraços e pontas dos pés.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'crunch',
    name: 'Abdominal Crunch',
    purpose: 'Hipertrofia',
    muscleGroup: 'Abdômen',
    description: 'Contraia o abdômen elevando o tronco em direção aos joelhos.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
  {
    id: 'leg_raise',
    name: 'Elevação de Pernas',
    purpose: 'Hipertrofia',
    muscleGroup: 'Abdômen',
    description: 'Deitado, eleve as pernas mantendo o abdômen contraído.',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Exercise | { error: string }>,
) {
  const {
    query: { id },
    method,
  } = req

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido' })
  }

  const exercise = mockExercises.find((ex) => ex.id === id)
  console.log(exercise, 'exercise na api')
  console.log()

  if (!exercise) {
    return res.status(404).json({ error: 'Exercício não encontrado' })
  }

  return res.status(200).json(exercise)
}
