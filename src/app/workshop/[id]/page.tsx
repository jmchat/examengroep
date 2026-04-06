import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { getProgress } from '@/lib/progress'
import { getWorkshop } from '@/lib/workshops'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  GraduationCap,
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
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3
                        sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="size-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none text-foreground">
                Examengroep
              </p>
              <p className="text-xs text-muted-foreground">AI Workshops</p>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
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
