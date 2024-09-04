import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  )
}