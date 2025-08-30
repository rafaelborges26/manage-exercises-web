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
    <div className="relative flex h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800 px-6">
  <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-900">
    <h2 className="mb-2 text-center text-3xl font-extrabold text-green-600 dark:text-green-500">
      Bora treinar?
    </h2>
    <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
      Bem-vindo de volta! Faça login para continuar sua jornada
    </p>

    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
      <Input {...register('email')} id="email" placeholder="Digite seu Email" />
      <div className="relative">
        <Input
          {...register('password')}
          id="password"
          type="password"
          placeholder="Digite sua Senha"
        />
        {/* Aqui poderia entrar o botão de mostrar/ocultar senha */}
      </div>

      <Button
        size={'lg'}
        className="w-full bg-green-500 font-bold hover:bg-green-600"
        type="submit"
      >
        Entrar
      </Button>

      <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <a href="#" className="hover:underline">Esqueceu a senha?</a>
        <a href="#" className="hover:underline">Criar conta</a>
      </div>
    </form>
  </div>
</div>
  )
}
