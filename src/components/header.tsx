import { Dumbbell, Home, UtensilsCrossed } from 'lucide-react'
import { useRouter } from 'next/router'

import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export function Header() {
  const router = useRouter()

  function handleNavigateSignIn() {
    router.push('/sign-in')
  }

  function handleNavigateSignUp() {
    router.push('/sign-up')
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Dumbbell className="h-6 w-6" />

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button onClick={handleNavigateSignUp} variant={'link'}>
            Register
          </Button>
          <Button onClick={handleNavigateSignIn}>Login</Button>
        </div>
      </div>
    </div>
  )
}
