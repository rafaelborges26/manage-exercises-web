import { zodResolver } from '@hookform/resolvers/zod'
import { Inter } from 'next/font/google'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const inter = Inter({ subsets: ['latin'] })

export default function SignUp() {
  const signUpSchema = z.object({
    name: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  type SignUpSchema = z.infer<typeof signUpSchema>

  const { register, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
    },
  })

  const handleSignUp = ({ email, lastname, name, password }: SignUpSchema) => {
    console.log(name, lastname, email, password, 'data test')
  }

  return (
    <div className="relative flex h-[100%] max-w-[1240px] flex-col items-center px-6 antialiased">
      <h2 className="mb-4 text-3xl font-bold text-green-600 dark:text-green-500 lg:text-4xl">
        Criar uma conta
      </h2>
      <p className="mb-8 text-center text-sm font-medium text-gray-700 dark:text-gray-400 lg:text-base">
        junte-se à nossa comunidade hoje! Crie uma conta para desbloquear
        recursos e experiências personalizadas.
      </p>

      <form onSubmit={handleSubmit(handleSignUp)} className="h-[100%] w-[100%]">
        <div className="w-auto space-y-4 py-4">
          <div className="flex w-auto flex-col gap-6 lg:flex-row">
            <Input
              {...register('name')}
              className="col-span-3"
              id="name"
              placeholder="Digite o primeiro nome"
            />

            <Input
              {...register('lastname')}
              className="col-span-3"
              id="name"
              placeholder="Digite o sobrenome"
            />
          </div>

          <div className="relative bottom-0 mb-6 mt-8 flex flex-col items-center justify-center gap-4 lg:relative lg:bottom-1 lg:mb-2 lg:flex-row lg:items-center lg:justify-center">
            <Input
              {...register('email')}
              id="email"
              placeholder="Digite o Email"
            />
            <Input
              {...register('password')}
              className="col-span-3"
              id="password"
              placeholder="Digite a senha"
              type="password"
            />
          </div>
          <div className="absolute bottom-[1rem] left-1 right-1 flex flex-row items-center justify-center gap-4 lg:relative lg:bottom-1 lg:mt-4 lg:items-center lg:justify-center">
            <Button
              type="submit"
              size={'lg'}
              className="w-[90%] bg-green-500 text-base font-bold hover:bg-green-600 lg:w-[20%]"
            >
              Criar conta
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
