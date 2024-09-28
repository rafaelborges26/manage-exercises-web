import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center px-6 antialiased">
      <h5>Dashboard</h5>
    </div>
  )
}
