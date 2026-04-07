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
  Shuffle,
  RotateCcw,
  Layers,
  Radio,
  Replace,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from 'lucide-react'

interface ChallengeCard {
  name: string
  email: string
  difficulty: number
  steps: number
  icon: typeof Binary
  color: string
  puzzle: string
  puzzleNote?: string
  hints: string[]
}

const challenges: ChallengeCard[] = [
  {
    name: 'Esther',
    email: 'esther@examengroep.nl',
    difficulty: 2,
    steps: 1,
    icon: Binary,
    color: 'bg-blue-600',
    puzzle: '4573746865723230323621',
    hints: [
      'Dit is geen willekeurige reeks. Elk teken is een hexadecimaal cijfer (0-9, a-f).',
      'Programmeurs gebruiken dit systeem om tekst op te slaan. Twee tekens = één karakter.',
    ],
  },
  {
    name: 'Lisa',
    email: 'lisa@examengroep.nl',
    difficulty: 2,
    steps: 1,
    icon: Shuffle,
    color: 'bg-emerald-600',
    puzzle: 'Yvfn2026!',
    puzzleNote: 'Let op: de cijfers en het uitroepteken zijn NIET versleuteld, alleen de letters.',
    hints: [
      'Het alfabet is verschoven. A is niet meer A.',
      'Er is precies één verschuiving waarbij het alfabet perfect in twee helften splitst.',
    ],
  },
  {
    name: 'Debbie',
    email: 'debbie@examengroep.nl',
    difficulty: 2,
    steps: 1,
    icon: Binary,
    color: 'bg-violet-600',
    puzzle: '01000100 01100101 01100010 01100010 01101001 01100101 00110010 00110000 00110010 00110110 00100001',
    hints: [
      'Computers denken in twee getallen. Dit is de taal van machines.',
      'Elke groep van 8 cijfers is één karakter.',
    ],
  },
  {
    name: 'Jeroen',
    email: 'jeroen@examengroep.nl',
    difficulty: 3,
    steps: 2,
    icon: Layers,
    color: 'bg-amber-600',
    puzzle: 'V3JlYnJhMjAyNiE=',
    puzzleNote: 'Waarschuwing: na de eerste decodering ben je er nog niet. Het resultaat moet nog een keer ontcijferd worden.',
    hints: [
      'Het = teken aan het einde is een veelvoorkomend kenmerk van een bepaald coderingssysteem.',
      'Na de eerste stap krijg je iets dat er bijna uitziet als een woord, maar net niet klopt. Dan begint puzzel twee.',
    ],
  },
  {
    name: 'Suzet',
    email: 'suzet@examengroep.nl',
    difficulty: 3,
    steps: 2,
    icon: Radio,
    color: 'bg-rose-600',
    puzzle: 'Tango Echo Zulu Uniform Sierra',
    puzzleNote: 'Dit zijn 5 woorden. Samen vormen ze 5 letters. Maar de volgorde klopt niet. Voeg daarna het huidige jaar + ! toe.',
    hints: [
      'Piloten en militairen gebruiken dit systeem om letters duidelijk over de radio te communiceren.',
      'De letters die je krijgt staan in de verkeerde volgorde. Draai ze om.',
    ],
  },
  {
    name: 'Angela',
    email: 'angela@examengroep.nl',
    difficulty: 3,
    steps: 1,
    icon: Replace,
    color: 'bg-cyan-600',
    puzzle: 'Zmtvoz2026!',
    puzzleNote: 'De cijfers en het uitroepteken zijn NIET versleuteld. Alleen de letters zijn getransformeerd.',
    hints: [
      'In dit systeem is het alfabet gespiegeld: de eerste letter wordt de laatste, de tweede wordt de voorlaatste, enzovoort.',
      'A wordt Z, B wordt Y, C wordt X... en andersom.',
    ],
  },
]

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

function ChallengeCardComponent({ challenge }: { challenge: ChallengeCard }) {
  const [showHints, setShowHints] = useState(false)
  const Icon = challenge.icon

  return (
    <Card className="flex h-full flex-col">
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
      <CardContent className="flex flex-1 flex-col space-y-4">
        <div className="flex-1">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Versleuteld wachtwoord
          </p>
          <div className="rounded-lg border-2 border-dashed border-primary/20 bg-muted/30 p-4">
            <p className="break-all font-mono text-sm leading-relaxed text-foreground">
              {challenge.puzzle}
            </p>
          </div>
          {challenge.puzzleNote && (
            <p className="mt-2 text-xs italic text-muted-foreground">
              {challenge.puzzleNote}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowHints(!showHints)}
            className="flex w-full cursor-pointer items-center gap-1.5 text-xs font-medium text-primary"
          >
            <Lightbulb className="size-3.5" />
            {showHints ? 'Verberg hints' : 'Ik kom er niet uit — toon hints'}
            {showHints ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          </button>

          {showHints && (
            <div className="mt-3 space-y-2">
              {challenge.hints.map((hint, i) => (
                <div
                  key={i}
                  className="flex gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2"
                >
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <p className="text-xs leading-relaxed text-foreground">
                    {hint}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
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
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Je wachtwoord is versleuteld met een onbekende methode. Gebruik Claude om erachter te komen
            welke versleuteling is gebruikt en wat je echte wachtwoord is. Zoek hieronder je naam,
            kopieer de code, en ga aan de slag!
          </p>
          <div className="mt-4 flex flex-col items-center gap-2
                          sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white
                         hover:bg-primary/90"
            >
              Open Claude
              <ExternalLink className="size-3.5" />
            </a>
            <span className="text-xs text-muted-foreground">
              Tip: kopieer je puzzel en vraag Claude om te helpen ontcijferen
            </span>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
          <p className="text-sm text-amber-800">
            <strong>Spelregels:</strong> Los alleen jouw eigen puzzel op. De hints zijn er als je vastloopt —
            probeer het eerst zonder! Je e-mailadres is je gebruikersnaam.
          </p>
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
            Wachtwoord gekraakt?
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Log in met je e-mailadres en het wachtwoord dat je hebt ontcijferd.
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
