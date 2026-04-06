import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { getProgress } from '@/lib/progress'
import { getWorkshop } from '@/lib/workshops'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Calendar,
  Clock,
} from 'lucide-react'
import ExerciseCard from './exercise-card'

interface WorkshopPageProps {
  params: Promise<{ id: string }>
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const user = await getSession()
  if (!user) redirect('/login')

  const { id } = await params
  const workshopId = parseInt(id, 10)
  const workshop = getWorkshop(workshopId)

  if (!workshop) notFound()

  const progress = await getProgress(user.id)

  // Build a set of completed exercise IDs for this workshop
  const completedSet = new Set(
    progress
      .filter((p) => p.workshopId === workshopId && p.completed)
      .map((p) => p.exerciseId)
  )

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-[#9e1357]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3
                        sm:px-6">
          <div className="flex items-center gap-4">
            <p className="font-[family-name:var(--font-logo)] text-lg font-light tracking-[0.25em] uppercase text-white">
              Examengroep
            </p>
            <span className="hidden text-xs text-white/60
                             sm:inline">AI Workshops</span>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
              <ArrowLeft className="mr-1.5 size-3.5" />
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-8
                       sm:px-6">
        {/* Workshop heading */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-3">
            Sessie {workshop.id}
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {workshop.title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {workshop.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {workshop.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {workshop.time}
            </span>
            <span className="text-xs">
              {completedSet.size}/{workshop.exercises.length} afgerond
            </span>
          </div>
        </div>

        {/* Exercise cards */}
        <div className="space-y-4">
          {workshop.exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              workshopId={workshop.id}
              initialCompleted={completedSet.has(exercise.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
