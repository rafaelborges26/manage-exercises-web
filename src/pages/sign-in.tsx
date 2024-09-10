import { zodResolver } from '@hookform/resolvers/zod'
import { Inter } from 'next/font/google'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const inter = Inter({ subsets: ['latin'] })

export default function SignIn() {
  const signInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  type SignInSchema = z.infer<typeof signInSchema>

  const { register, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSignIn = ({ email, password }: SignInSchema) => {
    console.log(email, password, 'test data')
  }

  return (
    <div className="flex min-h-screen flex-col items-center px-6 antialiased">
      <h2 className="mb-2 text-3xl font-bold text-green-600 dark:text-green-500 lg:text-4xl">
        Entrar
      </h2>
      <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-400 lg:text-base">
        Bem-vindo de volta! Por favor, faça login para acessar sua conta
      </p>

      <form onSubmit={handleSubmit(handleSignIn)}>
        <div className="w-auto space-y-4 py-4">
          <div className="flex w-auto flex-col gap-6 lg:flex-row">
            <Input
              {...register('email')}
              className="col-span-3"
              id="email"
              placeholder="Digite seu Email"
            />

            <Input
              {...register('password')}
              className="col-span-3"
              id="password"
              type="password"
              placeholder="Digite sua Senha"
            />
          </div>

          <div className="mb-6 mt-8 flex flex-row items-center justify-center gap-4 lg:mb-2 lg:items-center lg:justify-center">
            <Button
              size={'lg'}
              className="bg-green-500 text-base font-bold hover:bg-green-600"
              type="submit"
            >
              Entrar
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
