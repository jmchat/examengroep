import type { Metadata } from 'next'
import { Open_Sans, Noto_Sans } from 'next/font/google'
import Script from 'next/script'
import { getSession } from '@/lib/auth'
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getSession()
  const firstName = user?.name?.trim().split(/\s+/)[0]

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
          data-user-id={user ? String(user.id) : undefined}
          data-user-email={user?.email}
          data-user-name={user?.name}
          data-user-first-name={firstName}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
