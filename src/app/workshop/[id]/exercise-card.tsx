'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  BookOpen,
  PenTool,
  Home,
  Layout,
  Clock,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Quote,
  UserCircle,
} from 'lucide-react'
import type { Exercise } from '@/lib/workshops'
import { toggleExerciseAction } from './actions'

const typeConfig = {
  reference: { icon: BookOpen, label: 'Referentie', variant: 'secondary' as const },
  exercise: { icon: PenTool, label: 'Oefening', variant: 'default' as const },
  homework: { icon: Home, label: 'Huiswerk', variant: 'outline' as const },
  placeholder: { icon: Layout, label: 'Onderdeel', variant: 'secondary' as const },
}

interface ExerciseCardProps {
  exercise: Exercise
  workshopId: number
  initialCompleted: boolean
  userName?: string
  onToggle?: (exerciseId: string, newState: boolean) => void
}

export default function ExerciseCard({
  exercise,
  workshopId,
  initialCompleted,
  userName,
  onToggle,
}: ExerciseCardProps) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [expanded, setExpanded] = useState(false)
  const [isPending, startTransition] = useTransition()

  const config = typeConfig[exercise.type]
  const Icon = config.icon
  const { content } = exercise

  function handleToggle() {
    startTransition(async () => {
      const newState = await toggleExerciseAction(workshopId, exercise.id)
      setCompleted(newState)
      onToggle?.(exercise.id, newState)
    })
  }

  return (
    <Card className={completed ? 'border-primary/30 bg-primary/[0.02]' : ''}>
      <CardHeader>
        <button
          type="button"
          className="flex w-full cursor-pointer items-start justify-between gap-3 text-left"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-start gap-3">
            <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${completed ? 'bg-primary text-primary-foreground' : 'bg-primary/10'}`}>
              {completed
                ? <CheckCircle2 className="size-4" />
                : <Icon className="size-4 text-primary" />}
            </div>
            <div>
              <CardTitle className={`text-base ${completed ? 'text-primary' : ''}`}>
                {exercise.title}
              </CardTitle>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge variant={config.variant}>
                  {config.label}
                </Badge>
                {exercise.duration && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    {exercise.duration}
                  </span>
                )}
                {completed && !expanded && (
                  <span className="flex items-center gap-1 text-xs font-medium text-primary">
                    <CheckCircle2 className="size-3" />
                    Afgerond
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
          {/* Intro */}
          {content.intro && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {content.intro}
            </p>
          )}

          {/* Main table (spiekbriefje) */}
          {content.table && (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    {content.table.headers.map((header, i) => (
                      <th
                        key={i}
                        className="px-3 py-2 text-left font-medium text-foreground"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.table.rows.map((row, i) => (
                    <tr key={i} className="border-b last:border-0">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="px-3 py-2 text-muted-foreground"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Checklist */}
          {content.checklist && content.checklist.length > 0 && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <CheckCircle2 className="size-4 text-primary" />
                Checklist
              </h4>
              <ul className="space-y-1.5 pl-6">
                {content.checklist.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps */}
          {content.steps && content.steps.length > 0 && (
            <div className="space-y-4">
              {content.steps.map((step, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">
                    {step.label}
                  </h4>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                  {step.example && (
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-primary">
                        <Quote className="size-3" />
                        Voorbeeldprompt
                      </div>
                      <p className="whitespace-pre-line font-mono text-xs leading-relaxed text-foreground">
                        {step.example}
                      </p>
                    </div>
                  )}
                  {i < content.steps!.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Sections (for iterative exercises) */}
          {content.sections && content.sections.length > 0 && (
            <div className="space-y-5">
              {content.sections.map((section, i) => (
                <div key={i} className="space-y-2">
                  {section.heading && (
                    <h4 className="text-sm font-medium text-foreground">
                      {section.heading}
                    </h4>
                  )}
                  {section.text && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {section.text}
                    </p>
                  )}
                  {section.feedbackPrompts &&
                    section.feedbackPrompts.length > 0 && (
                      <div className="space-y-2 pl-4">
                        {section.feedbackPrompts.map((prompt, j) => (
                          <div
                            key={j}
                            className="rounded-lg border bg-muted/30 p-3"
                          >
                            <p className="font-mono text-xs leading-relaxed text-foreground">
                              {prompt}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  {i < content.sections!.length - 1 && (
                    <Separator className="mt-3" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Bonus tip */}
          {content.bonusTip && (
            <div className="flex gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-foreground">
                <span className="font-medium">Tip:</span> {content.bonusTip}
              </p>
            </div>
          )}

          {/* Tips table */}
          {content.tips && content.tips.length > 0 && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Lightbulb className="size-4 text-primary" />
                Tips voor bijsturen
              </h4>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-3 py-2 text-left font-medium text-foreground">
                        Situatie
                      </th>
                      <th className="px-3 py-2 text-left font-medium text-foreground">
                        Wat je kunt zeggen
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.tips.map((tip, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-3 py-2 font-medium text-foreground">
                          {tip.situation}
                        </td>
                        <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                          {tip.response}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Suggestions per person */}
          {content.suggestions && content.suggestions.length > 0 && (() => {
            const firstName = userName?.split(' ')[0]
            const mySuggestion = firstName
              ? content.suggestions!.find((s) => s.name.toLowerCase() === firstName.toLowerCase())
              : undefined
            const displaySuggestions = mySuggestion ? [mySuggestion] : content.suggestions!

            return (
              <div className="space-y-3">
                <h4 className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <UserCircle className="size-4 text-primary" />
                  {mySuggestion ? 'Suggestie voor jou' : 'Suggesties per persoon'}
                </h4>
                <div className={`grid gap-2 ${!mySuggestion ? 'sm:grid-cols-2' : ''}`}>
                  {displaySuggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className="rounded-lg border bg-card p-3"
                    >
                      {!mySuggestion && (
                        <p className="mb-1.5 text-sm font-medium text-foreground">
                          {suggestion.name}
                        </p>
                      )}
                      <ul className="space-y-1">
                        {suggestion.ideas.map((idea, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-1.5 text-xs text-muted-foreground"
                          >
                            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/40" />
                            {idea}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}

          <Separator />

          {/* Completion toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Markeer als afgerond
            </span>
            <Button
              variant={completed ? 'default' : 'outline'}
              size="sm"
              onClick={handleToggle}
              disabled={isPending}
            >
              {completed ? (
                <>
                  <CheckCircle2 className="mr-1.5 size-3.5" />
                  Afgerond
                </>
              ) : (
                <>
                  <Circle className="mr-1.5 size-3.5" />
                  Nog niet afgerond
                </>
              )}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
