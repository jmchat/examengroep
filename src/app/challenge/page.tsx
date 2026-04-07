'use client'

import { useState } from 'react'
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
  ArrowLeftRight,
  RotateCcw,
  Type,
  Puzzle,
  Hash,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react'

interface ChallengeCard {
  name: string
  email: string
  type: string
  difficulty: number
  icon: typeof Binary
  color: string
  puzzle: string
  hints: string[]
}

const challenges: ChallengeCard[] = [
  {
    name: 'Esther',
    email: 'esther@examengroep.nl',
    type: 'Base64 encoding',
    difficulty: 1,
    icon: Binary,
    color: 'bg-blue-500',
    puzzle: 'RXN0aGVyMjAyNiE=',
    hints: [
      'Dit is een Base64-gecodeerde tekst',
      'Vraag aan Claude: "Kun je deze Base64 string decoderen?"',
    ],
  },
  {
    name: 'Lisa',
    email: 'lisa@examengroep.nl',
    type: 'Omgekeerde tekst',
    difficulty: 1,
    icon: ArrowLeftRight,
    color: 'bg-emerald-500',
    puzzle: '!6202asiL',
    hints: [
      'Lees de tekst eens van rechts naar links...',
      'Vraag aan Claude: "Kun je deze tekst omdraaien?"',
    ],
  },
  {
    name: 'Debbie',
    email: 'debbie@examengroep.nl',
    type: 'Caesar cipher',
    difficulty: 2,
    icon: RotateCcw,
    color: 'bg-violet-500',
    puzzle: 'Gheelh2026!',
    hints: [
      'Dit is een Caesar cipher — elke letter is een vast aantal posities verschoven in het alfabet',
      'Vraag aan Claude: "Dit lijkt een Caesar cipher. Kun je alle mogelijke verschuivingen proberen?"',
    ],
  },
  {
    name: 'Jeroen',
    email: 'jeroen@examengroep.nl',
    type: 'Eerste letters',
    difficulty: 2,
    icon: Type,
    color: 'bg-amber-500',
    puzzle: 'Jouw examens resulteren op elke niveautest. Voeg het huidige jaar + ! toe aan de eerste letters.',
    hints: [
      'Het eerste deel van je wachtwoord is verstopt in de zin. Kijk naar de eerste letter van elk woord (tot en met de punt).',
      'Vraag aan Claude: "Wat krijg je als je de eerste letter van de eerste 6 woorden in deze zin pakt, en daar 2026! achter zet?"',
    ],
  },
  {
    name: 'Suzet',
    email: 'suzet@examengroep.nl',
    type: 'Morse code',
    difficulty: 3,
    icon: Puzzle,
    color: 'bg-rose-500',
    puzzle: '... ..- --.. . - ..--- ----- ..--- -.... -.-.--',
    hints: [
      'Dit is een bekend communicatiesysteem met punten en streepjes',
      'Vraag aan Claude: "Kun je deze morse code vertalen naar tekst?"',
    ],
  },
  {
    name: 'Angela',
    email: 'angela@examengroep.nl',
    type: 'Cijfer-letter substitutie',
    difficulty: 3,
    icon: Hash,
    color: 'bg-cyan-500',
    puzzle: '1-14-7-5-12-1 + het huidige jaar + !',
    hints: [
      'Elk cijfer staat voor een positie in het alfabet (A=1, B=2, C=3, ...)',
      'Vraag aan Claude: "Als A=1 en B=2, welk woord vormen de getallen 1-14-7-5-12-1?"',
    ],
  },
]

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`size-1.5 rounded-full ${i <= level ? 'bg-primary' : 'bg-muted'}`}
        />
      ))}
    </div>
  )
}

function ChallengeCardComponent({ challenge }: { challenge: ChallengeCard }) {
  const [showHints, setShowHints] = useState(false)
  const Icon = challenge.icon

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex size-10 items-center justify-center rounded-lg ${challenge.color}`}>
              <Icon className="size-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">{challenge.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{challenge.email}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="secondary" className="text-xs">
              {challenge.type}
            </Badge>
            <DifficultyDots level={challenge.difficulty} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Jouw puzzel
          </p>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="break-all font-mono text-sm leading-relaxed text-foreground">
              {challenge.puzzle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowHints(!showHints)}
          className="flex w-full cursor-pointer items-center gap-1.5 text-xs font-medium text-primary"
        >
          <Lightbulb className="size-3.5" />
          {showHints ? 'Verberg hints' : 'Toon hints'}
          {showHints ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
        </button>

        {showHints && (
          <div className="space-y-2">
            {challenge.hints.map((hint, i) => (
              <div
                key={i}
                className="flex gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2"
              >
                <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-primary" />
                <p className="text-xs leading-relaxed text-foreground">
                  {hint}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function ChallengePage() {
  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-[#9e1357]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3
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

      <main className="mx-auto max-w-5xl px-4 py-8
                       sm:px-6">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Lock className="size-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground
                         sm:text-3xl">
            Kraak je wachtwoord
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Je wachtwoord is versleuteld. Gebruik Claude om de puzzel op te lossen
            en in te loggen op het platform. Zoek hieronder je naam en ga aan de slag!
          </p>
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary
                       hover:underline"
          >
            Open Claude
            <ExternalLink className="size-3.5" />
          </a>
        </div>

        <div className="grid gap-4
                        sm:grid-cols-2
                        lg:grid-cols-3">
          {challenges.map((challenge) => (
            <ChallengeCardComponent key={challenge.email} challenge={challenge} />
          ))}
        </div>

        <div className="mt-8 rounded-xl border bg-card p-6 text-center">
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Gelukt?
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Heb je je wachtwoord gevonden? Ga dan naar het loginscherm en log in.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors
                       hover:bg-primary/90"
          >
            <Lock className="size-4" />
            Naar inloggen
          </a>
        </div>
      </main>
    </div>
  )
}
