import { HTMLAttributes } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export interface MenuProps extends HTMLAttributes<HTMLButtonElement> {
  handleClick: () => void
}

export function AvatarMenu({ handleClick }: MenuProps) {
  const siglas = 'RB'

  return (
    <button className="border-none bg-transparent" onClick={handleClick}>
      <Avatar>
        <AvatarImage src="https://github.com/rafaelborges26.png" />
        <AvatarFallback>{siglas}</AvatarFallback>
      </Avatar>
    </button>
  )
}
