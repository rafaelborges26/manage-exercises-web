import { Dumbbell, LogOut, UserPen } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { AvatarMenu } from './avatar-menu'
import { ThemeToggle } from './theme/theme-toggle'
import { Button } from './ui/button'

export function Header() {
  const isAuthenticated = true

  const router = useRouter()

  const [isOpenMenu, setIsOpenMenu] = useState(false)

  function handleNavigateSignIn() {
    router.push('/sign-in')
  }

  function handleNavigateSignUp() {
    router.push('/sign-up')
  }

  const handleClickAvatar = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <div className="border-b">
      <div className="flex h-[10vh] items-center gap-6 px-6">
        <Dumbbell className="h-6 w-6" />
        <ThemeToggle />

        {isAuthenticated ? (
          <div className="relative ml-auto flex items-center gap-2">
            <AvatarMenu handleClick={handleClickAvatar} />
            {isOpenMenu && (
              <div className="absolute bottom-0 right-1 top-14 flex flex-col gap-2">
                <Button aria-label="Perfil">
                  <UserPen size={'24'} />
                </Button>
                <Button variant={'default'} aria-label="Treinos">
                  <Dumbbell size={'24'} />
                </Button>
                <Button variant={'default'} aria-label="Sair">
                  <LogOut size={'24'} />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={handleNavigateSignUp} variant={'link'}>
              Register
            </Button>
            <Button onClick={handleNavigateSignIn}>Login</Button>
          </div>
        )}
      </div>
    </div>
  )
}
