import { Inter } from 'next/font/google'
import Image from 'next/image'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col px-6 antialiased">
      <h5>signIn</h5>
    </div>
  )
}
