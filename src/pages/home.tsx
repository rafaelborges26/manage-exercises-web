import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { push } = useRouter()

  const handleCreateTraining = () => {
    push('/create-training')
  }

  return (
    <div className="flex flex-col items-center px-6 antialiased">
      <h5>Home</h5>
      <Button onClick={handleCreateTraining}>Criar novo treino</Button>
    </div>
  )
}
