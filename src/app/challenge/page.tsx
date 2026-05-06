import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { challenges } from '@/lib/challenges'
import { Lock, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default async function ChallengeOverviewPage() {
  const user = await getSession()

  // Only trainers can see the overview with all links
  if (!user || user.role !== 'trainer') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-[#1d4ed8]">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3
                        sm:px-6">
          <div className="flex items-center gap-4">
            <p className="font-[family-name:var(--font-logo)] text-lg font-light tracking-[0.25em] uppercase text-white">
              Examengroep
            </p>
            <span className="hidden text-xs text-white/60
                             sm:inline">AI Workshops</span>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-white/80
                       hover:text-white"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8
                       sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Challenge overzicht
          </h1>
          <p className="mt-1 text-muted-foreground">
            Stuur elke deelnemer hun persoonlijke link. Alleen zij zien hun eigen puzzel.
          </p>
        </div>

        <div className="space-y-3">
          {challenges.map((c) => (
            <div
              key={c.slug}
              className="flex items-center justify-between rounded-lg border bg-card px-4 py-3"
            >
              <div>
                <p className="font-medium text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <code className="hidden rounded bg-muted px-2 py-1 text-xs text-foreground
                                 sm:block">
                  /challenge/{c.slug}
                </code>
                <a
                  href={`/challenge/${c.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white
                             hover:bg-primary/90"
                >
                  Open
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
