import '@/styles/globals.css'

import type { AppProps } from 'next/app'

import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { TrainingProvider } from '@/contexts/TrainingContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
      <main className="h-[100vh] font-roboto bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <div className="mt-6 flex h-[86%] items-center justify-center overflow-auto">
          <TrainingProvider>
            <Component {...pageProps} />
          </TrainingProvider>
        </div>
      </main>
    </ThemeProvider>
  )
}
