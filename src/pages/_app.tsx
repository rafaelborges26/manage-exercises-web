import '@/styles/globals.css'

import type { AppProps } from 'next/app'

import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme/theme-provider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
      <main>
        <Header />
        <div className="mt-6">
          <Component {...pageProps} />
        </div>
      </main>
    </ThemeProvider>
  )
}
