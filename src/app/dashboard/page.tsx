import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { getProgress, getWorkshopProgress } from '@/lib/progress'
import { workshops, getExerciseCount } from '@/lib/workshops'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Clock,
  ChevronRight,
  LogOut,
  Lock,
  BookOpen,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { logoutAction } from './actions'

const workshopIcons = [BookOpen, Sparkles, CheckCircle2]

export default async function DashboardPage() {
  const user = await getSession()
  if (!user) redirect('/login')

  const progress = await getProgress(user.id)

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
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

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-white/60">{user.role === 'trainer' ? 'Trainer' : 'Deelnemer'}</p>
            </div>
            <form action={logoutAction}>
              <Button variant="ghost" size="icon" type="submit" className="text-white hover:bg-white/10 hover:text-white">
                <LogOut className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-8
                       sm:px-6">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Welkom, {user.name.split(' ')[0]}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {user.role === 'trainer'
              ? 'Je beheert deze workshopserie als trainer.'
              : 'Hier vind je alle materialen en oefeningen voor de AI workshops.'}
          </p>
        </div>

        {/* Workshop cards */}
        <div className="grid gap-4
                        md:grid-cols-3">
          {workshops.map((workshop, index) => {
            const totalExercises = getExerciseCount(workshop.id)
            const { completed } = getWorkshopProgress(
              progress,
              workshop.id,
              totalExercises
            )
            const Icon = workshopIcons[index] || BookOpen
            // Only session 1 is unlocked for participants; trainers see all
            const isLocked = user.role !== 'trainer' && workshop.id > 1

            const cardContent = (
              <Card className={`h-full transition-shadow ${isLocked ? 'opacity-50' : 'hover:shadow-md'}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`flex size-10 items-center justify-center rounded-lg ${isLocked ? 'bg-muted' : 'bg-primary/10'}`}>
                      {isLocked
                        ? <Lock className="size-5 text-muted-foreground" />
                        : <Icon className="size-5 text-primary" />}
                    </div>
                    <Badge variant="secondary">
                      Sessie {workshop.id}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3">
                    {workshop.title}
                  </CardTitle>
                  <CardDescription>
                    {workshop.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Date and time */}
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {workshop.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        {workshop.time}
                      </span>
                    </div>

                    {isLocked ? (
                      <div className="flex items-center gap-1.5 pt-1 text-sm text-muted-foreground">
                        <Lock className="size-3.5" />
                        Beschikbaar na de vorige sessie
                      </div>
                    ) : (
                      <>
                        {/* Progress bar */}
                        <div>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              Voortgang
                            </span>
                            <span className="font-medium text-foreground">
                              {completed}/{totalExercises}
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{
                                width: `${totalExercises > 0 ? (completed / totalExercises) * 100 : 0}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-end pt-1 text-sm font-medium text-primary transition-colors
                                        group-hover:text-primary/80">
                          Bekijk workshop
                          <ChevronRight className="ml-0.5 size-4" />
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )

            if (isLocked) {
              return (
                <div key={workshop.id} className="cursor-not-allowed">
                  {cardContent}
                </div>
              )
            }

            return (
              <Link
                key={workshop.id}
                href={`/workshop/${workshop.id}`}
                className="group"
              >
                {cardContent}
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
