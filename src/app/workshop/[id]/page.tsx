import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { getProgress } from '@/lib/progress'
import { getHomeworkEntries } from '@/lib/homework'
import { getWorkshop, isWorkshopUnlocked } from '@/lib/workshops'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Coffee,
  Users,
  Presentation,
  MessageSquare,
  Lightbulb,
  Briefcase,
  BookOpen,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ExerciseList from './exercise-list'
import HomeworkForm from './homework-form'

interface ScheduleItem {
  time: string
  label: string
  duration: string
  icon: React.ComponentType<{ className?: string }>
}

const workshopSchedules: Record<number, ScheduleItem[]> = {
  2: [
    { time: '09:00 - 09:15', label: 'Opening & terugblik sessie 1', duration: '15 min', icon: Users },
    { time: '09:15 - 09:45', label: 'Huiswerk bespreken (ervaringen delen)', duration: '30 min', icon: MessageSquare },
    { time: '09:45 - 10:30', label: 'Blok A: AI voor examencontent', duration: '45 min', icon: BookOpen },
    { time: '10:30 - 10:45', label: 'Pauze', duration: '15 min', icon: Coffee },
    { time: '10:45 - 11:30', label: 'Blok B: AI voor documenten & workflows', duration: '45 min', icon: Presentation },
    { time: '11:30 - 11:45', label: 'Eigen werkcase toepassen', duration: '15 min', icon: Briefcase },
    { time: '11:45 - 12:00', label: 'Wrap-up + vooruitblik sessie 3', duration: '15 min', icon: Lightbulb },
  ],
}

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

  if (!isWorkshopUnlocked(workshopId, user.role)) {
    redirect('/dashboard')
  }

  const [progress, homeworkEntries] = await Promise.all([
    getProgress(user.id),
    getHomeworkEntries(user.id, workshopId),
  ])

  // Build a set of completed exercise IDs for this workshop
  const completedSet = new Set(
    progress
      .filter((p) => p.workshopId === workshopId && p.completed)
      .map((p) => p.exerciseId)
  )

  // Split exercises: homework gets its own form component
  const regularExercises = workshop.exercises.filter((e) => e.type !== 'homework')
  const hasHomework = workshop.exercises.some((e) => e.type === 'homework')

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-[#1d4ed8]">
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
              {Array.from(completedSet).filter((id) => regularExercises.some((e) => e.id === id)).length}/{regularExercises.length} afgerond
            </span>
          </div>
        </div>

        {/* Programma */}
        {workshopSchedules[workshop.id] && (
          <section className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              <Clock className="size-4 text-[#1d4ed8]" />
              Programma
            </h2>
            <Card>
              <CardContent className="pt-2">
                <div className="divide-y divide-border">
                  {workshopSchedules[workshop.id].map((item, index) => {
                    const Icon = item.icon
                    const isPause = item.label === 'Pauze'
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-4 py-3 ${isPause ? 'bg-muted/50 -mx-4 px-4 rounded-lg' : ''}`}
                      >
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isPause ? 'bg-muted' : 'bg-[#1d4ed8]/10'}`}>
                          <Icon className={`size-4 ${isPause ? 'text-muted-foreground' : 'text-[#1d4ed8]'}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-medium ${isPause ? 'text-muted-foreground italic' : 'text-foreground'}`}>
                            {item.label}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground">
                          <span className="hidden font-mono text-xs
                                           sm:inline">{item.time}</span>
                          <Badge variant="secondary" className="font-mono text-xs">
                            {item.duration}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Exercise cards */}
        <ExerciseList
          exercises={regularExercises}
          workshopId={workshop.id}
          initialCompletedIds={Array.from(completedSet)}
          userName={user.role === 'trainer' ? undefined : user.name}
        />

        {/* Homework form */}
        {hasHomework && (
          <div className="mt-4">
            <HomeworkForm
              workshopId={workshop.id}
              initialEntries={homeworkEntries}
            />
          </div>
        )}
      </main>
    </div>
  )
}
