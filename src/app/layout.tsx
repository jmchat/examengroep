import type { Metadata } from 'next'
import { Open_Sans, Noto_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const openSans = Open_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
})

const notoSans = Noto_Sans({
  variable: '--font-logo',
  subsets: ['latin'],
  weight: ['300', '400'],
})

export const metadata: Metadata = {
  title: 'Examengroep AI Workshops',
  description:
    'Workshop platform voor de AI-trainingssessies van Examengroep. Leer werken met AI-tools voor examens en werkprocessen.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="nl"
      className={`${openSans.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Script
          src="https://feedback-kit-hub.vercel.app/widget.js"
          data-project="examengroep-workshop"
          data-secret="80d08609-f0d8-4237-99a6-f6ea46c7c7f7"
          data-mode="testing"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
