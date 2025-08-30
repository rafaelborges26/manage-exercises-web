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
<div className="flex h-auto min-h-full flex-col-reverse items-center justify-start gap-8 px-6 py-10 mt-[55%] antialiased lg:flex-row lg:gap-16 lg:py-20 lg:mt-[0%]">


  {/* Texto */}
  <section className="flex flex-col text-center lg:text-left lg:w-[55%]">
    <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white lg:text-5xl">
      <span className="text-green-600 dark:text-green-500">TreinoMaster:</span>{" "}
      Controle Completo de Aulas e Treinos
    </h1>

    <p className="mt-6 text-base font-medium text-gray-700 dark:text-gray-400 lg:text-lg">
      O <strong>PersonalPro</strong> é a solução ideal para personal trainers 
      organizarem e acompanharem os treinos e aulas de seus alunos de forma prática e eficiente.
    </p>

    <p className="mt-3 text-base font-medium text-gray-700 dark:text-gray-400 lg:text-lg">
      Crie planos de treino personalizados, monitore o desempenho, agende aulas e otimize o progresso dos alunos. 
      Simplifique sua rotina e ofereça um serviço ainda mais profissional.
    </p>

    {/* Botões */}
    <div className="mt-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-start">
      <Button
        onClick={handleNavigateSignUp}
        size="lg"
        className="w-full lg:w-auto bg-green-500 text-base font-bold hover:bg-green-600"
      >
        Criar conta
      </Button>
      <Button
        onClick={handleNavigateSignIn}
        size="lg"
        className="w-full lg:w-auto text-base font-bold"
      >
        Entrar
      </Button>
    </div>
  </section>

  {/* Imagem */}
  <div className="flex w-full justify-center lg:w-[45%]">
    <div className="relative w-full max-w-md">
      <Image
        src={GroupImage}
        alt="Setas de crescimento"
        className="absolute -top-20 left-1/2 w-[80%] -translate-x-1/2 opacity-70"
      />
      <Image
        src={FitnessModelsImage}
        alt="Fitness"
        className="relative rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-lg"
      />
    </div>
  </div>
</div>

  )
}
