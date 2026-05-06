'use client'

import { useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Lock,
  Binary,
  Shuffle,
  Layers,
  Radio,
  Replace,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react'
import { challenges, type Challenge } from '@/lib/challenges'

const iconMap: Record<string, typeof Binary> = {
  Binary,
  Shuffle,
  Layers,
  Radio,
  Replace,
}

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[10px] text-muted-foreground mr-0.5">Moeilijkheid:</span>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`size-2 rounded-full ${i <= level ? 'bg-primary' : 'bg-muted'}`}
        />
      ))}
    </div>
  )
}

function ChallengeContent({ challenge }: { challenge: Challenge }) {
  const [showHints, setShowHints] = useState(false)
  const Icon = iconMap[challenge.icon] || Lock

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-[#1d4ed8]">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3
                        sm:px-6">
          <div className="flex items-center gap-4">
            <p className="font-[family-name:var(--font-logo)] text-lg font-light tracking-[0.25em] uppercase text-white">
              Examengroep
            </p>
            <span className="hidden text-xs text-white/60
                             sm:inline">AI Workshops</span>
          </div>
          <a
            href="/login"
            className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white transition-colors
                       hover:bg-white/20"
          >
            <Lock className="size-3.5" />
            Inloggen
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8
                       sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl ${challenge.color}`}>
            <Icon className="size-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground
                         sm:text-3xl">
            Welkom, {challenge.name}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Je wachtwoord is versleuteld. Gebruik Claude om erachter te komen welke
            versleuteling is gebruikt en wat je echte wachtwoord is.
          </p>
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white
                       hover:bg-primary/90"
          >
            Open Claude
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        {/* Challenge card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Jouw puzzel</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Inloggen als: <span className="font-mono text-foreground">{challenge.email}</span>
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {challenge.steps > 1 && (
                  <Badge variant="destructive" className="text-[10px]">
                    {challenge.steps} stappen
                  </Badge>
                )}
                <DifficultyDots level={challenge.difficulty} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Puzzle */}
            <div className="rounded-lg border-2 border-dashed border-primary/20 bg-muted/30 p-5">
              <p className="break-all font-mono text-base leading-relaxed text-foreground
                            sm:text-lg">
                {challenge.puzzle}
              </p>
            </div>

            {challenge.puzzleNote && (
              <p className="text-sm italic text-muted-foreground">
                {challenge.puzzleNote}
              </p>
            )}

            {/* Instructions */}
            <div className="rounded-lg border bg-card p-4">
              <p className="text-sm font-medium text-foreground mb-2">Wat moet je doen?</p>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-muted-foreground">
                <li>Kopieer de code hierboven</li>
                <li>Open Claude en plak de code</li>
                <li>Vraag Claude om je te helpen ontcijferen</li>
                <li>Gebruik het ontcijferde wachtwoord om in te loggen</li>
              </ol>
            </div>

            {/* Hints */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowHints(!showHints)}
                className="flex w-full cursor-pointer items-center gap-1.5 text-sm font-medium text-primary"
              >
                <Lightbulb className="size-4" />
                {showHints ? 'Verberg hints' : 'Ik kom er niet uit — toon hints'}
                {showHints ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
              </button>

              {showHints && (
                <div className="mt-3 space-y-2">
                  {challenge.hints.map((hint, i) => (
                    <div
                      key={i}
                      className="flex gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-foreground">
                        {hint}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Login CTA */}
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors
                       hover:bg-primary/90"
          >
            <Lock className="size-4" />
            Wachtwoord gekraakt? Ga inloggen
          </a>
        </div>
      </main>
    </div>
  )
}

export default function ChallengeNamePage() {
  const params = useParams<{ name: string }>()
  const challenge = challenges.find((c) => c.slug === params.name?.toLowerCase())

  if (!challenge) {
    notFound()
  }

  return <ChallengeContent challenge={challenge} />
}
