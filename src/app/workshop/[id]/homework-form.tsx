'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Home,
  ChevronDown,
  ChevronUp,
  Save,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { saveHomeworkAction } from './actions'
import type { HomeworkEntry } from '@/lib/homework'

const usableOptions = ['ja', 'deels', 'nee']

interface HomeworkFormProps {
  workshopId: number
  initialEntries: HomeworkEntry[]
}

function EntryForm({
  workshopId,
  entryNumber,
  initial,
}: {
  workshopId: number
  entryNumber: number
  initial?: HomeworkEntry
}) {
  const [promptUsed, setPromptUsed] = useState(initial?.promptUsed || '')
  const [result, setResult] = useState(initial?.result || '')
  const [adjusted, setAdjusted] = useState(initial?.adjusted || '')
  const [usable, setUsable] = useState(initial?.usable || '')
  const [nextTime, setNextTime] = useState(initial?.nextTime || '')
  const [saved, setSaved] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSave() {
    startTransition(async () => {
      await saveHomeworkAction(workshopId, {
        entryNumber,
        promptUsed,
        result,
        adjusted,
        usable,
        nextTime,
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    })
  }

  const hasContent = promptUsed || result || adjusted || usable || nextTime

  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">
          Keer {entryNumber}
        </h4>
        {hasContent && (
          <Button
            size="sm"
            variant={saved ? 'default' : 'outline'}
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-1.5 size-3.5 animate-spin" />
            ) : saved ? (
              <CheckCircle2 className="mr-1.5 size-3.5" />
            ) : (
              <Save className="mr-1.5 size-3.5" />
            )}
            {saved ? 'Opgeslagen' : 'Opslaan'}
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`prompt-${entryNumber}`} className="text-xs">
          Wat vroeg je aan Claude?
        </Label>
        <textarea
          id={`prompt-${entryNumber}`}
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm
                     placeholder:text-muted-foreground
                     focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          rows={2}
          placeholder="Beschrijf kort wat je hebt gevraagd..."
          value={promptUsed}
          onChange={(e) => setPromptUsed(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`result-${entryNumber}`} className="text-xs">
          Wat was het resultaat?
        </Label>
        <textarea
          id={`result-${entryNumber}`}
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm
                     placeholder:text-muted-foreground
                     focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          rows={2}
          placeholder="Beschrijf het resultaat..."
          value={result}
          onChange={(e) => setResult(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`adjusted-${entryNumber}`} className="text-xs">
          Heb je het bijgestuurd? Hoe?
        </Label>
        <textarea
          id={`adjusted-${entryNumber}`}
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm
                     placeholder:text-muted-foreground
                     focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          rows={2}
          placeholder="Bijv. 'Ja, ik heb gevraagd om het korter te maken'"
          value={adjusted}
          onChange={(e) => setAdjusted(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Was het bruikbaar?</Label>
        <div className="flex gap-2">
          {usableOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setUsable(opt)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                usable === opt
                  ? 'border-primary bg-primary text-white'
                  : 'border-input bg-transparent text-muted-foreground hover:bg-muted'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`next-${entryNumber}`} className="text-xs">
          Wat zou je volgende keer anders doen?
        </Label>
        <textarea
          id={`next-${entryNumber}`}
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm
                     placeholder:text-muted-foreground
                     focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          rows={2}
          placeholder="Bijv. 'Meer context geven over het doel'"
          value={nextTime}
          onChange={(e) => setNextTime(e.target.value)}
        />
      </div>
    </div>
  )
}

export default function HomeworkForm({
  workshopId,
  initialEntries,
}: HomeworkFormProps) {
  const [expanded, setExpanded] = useState(false)

  const hasEntries = initialEntries.some((e) => e.promptUsed)

  return (
    <Card className={hasEntries ? 'border-primary/30 bg-primary/[0.02]' : ''}>
      <CardHeader>
        <button
          type="button"
          className="flex w-full cursor-pointer items-start justify-between gap-3 text-left"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${hasEntries ? 'bg-primary text-primary-foreground' : 'bg-primary/10'}`}>
              {hasEntries
                ? <CheckCircle2 className="size-4" />
                : <Home className="size-4 text-primary" />}
            </div>
            <div>
              <CardTitle className={`text-base ${hasEntries ? 'text-primary' : ''}`}>
                Huiswerk voor sessie {workshopId + 1}
              </CardTitle>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge variant="outline">Huiswerk</Badge>
                {hasEntries && !expanded && (
                  <span className="flex items-center gap-1 text-xs font-medium text-primary">
                    <CheckCircle2 className="size-3" />
                    {initialEntries.filter((e) => e.promptUsed).length}/3 ingevuld
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-1 shrink-0">
            {expanded ? (
              <ChevronUp className="size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-4 text-muted-foreground" />
            )}
          </div>
        </button>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-sm leading-relaxed text-foreground">
              Gebruik Claude <strong>minimaal 3 keer</strong> komende week bij een dagelijkse taak.
              Vul hieronder per keer in wat je hebt gedaan. Je antwoorden worden automatisch opgeslagen.
            </p>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((num) => (
              <EntryForm
                key={num}
                workshopId={workshopId}
                entryNumber={num}
                initial={initialEntries.find((e) => e.entryNumber === num)}
              />
            ))}
          </div>

          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">
              <strong>Neem naar sessie {workshopId + 1} mee:</strong> Eén concreet voorbeeld dat je wilt verbeteren
              of verder uitwerken. Optioneel: een document als werkmateriaal (examenverantwoording,
              contract, format-voorbeeld, etc.)
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
