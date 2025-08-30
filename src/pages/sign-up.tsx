import { zodResolver } from '@hookform/resolvers/zod'
import { Inter } from 'next/font/google'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MuscleMascot } from '@/components/muscleMascot'

const inter = Inter({ subsets: ['latin'] })

export default function SignUp() {
  const signUpSchema = z.object({
    name: z.string().min(1, 'Informe o nome'),
    lastname: z.string().min(1, 'informe o sobrenome'),
    email: z.string().min(1, 'Informe o email').email({message: 'email inválido'}),
    phone: z.string().min(1, 'Informe o celular'),
    password: z.string().min(1, 'Informe a senha'),
  })

  type SignUpSchema = z.infer<typeof signUpSchema>

  const { register, handleSubmit, formState: { errors }} = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      password: '',
    },
  })

  const handleSignUp = ({ email, lastname, name, phone, password }: SignUpSchema) => {
    console.log(name, lastname, email, phone, password, 'data test')
  }
  console.log(errors, 'errors')

  return (
    <div className="relative mx-auto flex max-w-[1240px] flex-col items-center px-6 py-10 antialiased">

    <div className="hidden lg:block">
      <MuscleMascot />
    </div>

      <h2 className="mb-4 text-3xl font-bold text-green-600 dark:text-green-500 lg:text-4xl">
        Criar uma conta
      </h2>
      <p className="mb-8 text-center text-sm font-medium text-gray-700 dark:text-gray-400 lg:text-base">
        Junte-se à nossa comunidade hoje! Crie uma conta para desbloquear recursos e experiências personalizadas.
      </p>

      <form onSubmit={handleSubmit(handleSignUp)} className="w-full animate-fadeIn">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col">
            <Input
              {...register('name')}
              id="name"
              placeholder="Digite o primeiro nome"
            />
            {errors.name && <span className="mt-1 text-sm text-red-500">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col">
            <Input
              {...register('lastname')}
              id="lastname"
              placeholder="Digite o sobrenome"
            />
            {errors.lastname && <span className="mt-1 text-sm text-red-500">{errors.lastname.message}</span>}
          </div>

          <div className="flex flex-col">
            <Input
              {...register('email')}
              id="email"
              placeholder="Digite o Email"
            />
            {errors.email && <span className="mt-1 text-sm text-red-500">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col">
            <Input
              {...register('phone')}
              id="phone"
              placeholder="Digite o Celular"
            />
            {errors.phone && <span className="mt-1 text-sm text-red-500">{errors.phone.message}</span>}
          </div>

          <div className="flex flex-col">
            <Input
              {...register('password')}
              id="password"
              placeholder="Digite a senha"
              type="password"
            />
            {errors.password && <span className="mt-1 text-sm text-red-500">{errors.password.message}</span>}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            type="submit"
            size="lg"
            className="w-full max-w-xs bg-green-500 font-bold text-white hover:bg-green-600"
          >
            Criar conta
          </Button>
        </div>
      </form>
    </div>
  )
}
