import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export interface NavLinkProps extends LinkProps {
  children: ReactNode
}

export function NavLink(props: NavLinkProps) {
  const { pathname } = useRouter()
  return (
    <Link
      data-current={pathname === props.href}
      {...props}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
    />
  )
}
