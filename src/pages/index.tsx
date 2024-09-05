import { Inter } from 'next/font/google'
import Image from 'next/image'
import { useRouter } from 'next/router'

import FitnessModelsImage from '@/assets/images/FitnessModels.png'
import GroupImage from '@/assets/images/Group.png'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()

  function handleNavigateSignIn() {
    router.push('/sign-in')
  }

  function handleNavigateSignUp() {
    router.push('/sign-up')
  }

  return (
    <div className="flex h-auto min-h-screen px-6 antialiased">
      <section className="flex w-[75%] flex-col justify-center md:w-[45%]">
        <span className="text-[2rem] font-bold">
          <strong className="text-green-600 dark:text-green-500">
            PersonalPro:
          </strong>{' '}
          Gestão de Treinos e Aulas
        </span>

        <span className="text-[2rem] font-bold">
          <strong className="text-green-600 dark:text-green-500">
            TreinoMaster:
          </strong>{' '}
          Controle Completo de Aulas e Treinos
        </span>
        <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-400">
          O PersonalPro é a solução ideal para personal trainers organizarem e
          acompanharem os treinos e aulas de seus alunos de forma prática e
          eficiente.
        </p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
          Com ferramentas intuitivas, você pode criar planos de treino
          personalizados, monitorar o desempenho, agendar aulas e otimizar o
          progresso dos seus alunos. Simplifique sua rotina e ofereça um serviço
          ainda mais profissional com o PersonalPro.
        </p>
        <div className="mb-2 mt-4 flex flex-row gap-4">
          <Button
            onClick={handleNavigateSignUp}
            className="bg-green-500 font-bold hover:bg-green-600"
          >
            Criar conta
          </Button>
          <Button onClick={handleNavigateSignIn} className="font-bold">
            Entrar
          </Button>
        </div>
      </section>
      <div className="m-auto h-auto w-auto">
        <Image src={GroupImage} className="ml-5rem mb-[-10rem]" alt="" />
        <Image src={FitnessModelsImage} alt="Fitness" />
      </div>
    </div>
  )
}
