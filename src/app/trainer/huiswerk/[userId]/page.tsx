import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { getParticipantHomework } from '@/lib/homework'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  User,
  MessageSquare,
  Sparkles,
  Wrench,
  CheckCircle2,
  RefreshCw,
  Home,
} from 'lucide-react'

const HOMEWORK_WORKSHOP_ID = 1
const HOMEWORK_TARGET_ENTRIES = 3

interface PageProps {
  params: Promise<{ userId: string }>
}

function usableBadge(usable: string) {
  if (!usable) return null
  const variants: Record<string, string> = {
    ja: 'bg-emerald-600',
    deels: 'bg-amber-600',
    nee: 'bg-rose-600',
  }
  return (
    <Badge className={`capitalize text-white ${variants[usable] || 'bg-muted'}`}>
      Bruikbaar: {usable}
    </Badge>
  )
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-1.5">
        <Icon className="size-3.5 text-[#1d4ed8]" />
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      </div>
      {value ? (
        <p className="whitespace-pre-wrap rounded-lg border bg-card p-3 text-sm text-foreground">
          {value}
        </p>
      ) : (
        <p className="rounded-lg border border-dashed p-3 text-sm italic text-muted-foreground">
          Niet ingevuld
        </p>
      )}
    </div>
  )
}

export default async function TrainerHomeworkDetailPage({ params }: PageProps) {
  const user = await getSession()
  if (!user) redirect('/login')
  if (user.role !== 'trainer') redirect('/dashboard')

  const { userId: userIdParam } = await params
  const userId = Number(userIdParam)
  if (!Number.isFinite(userId)) notFound()

  const data = await getParticipantHomework(userId, HOMEWORK_WORKSHOP_ID)
  if (!data) notFound()

  const filled = data.entries.filter((e) => e.promptUsed).length

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-[#1d4ed8]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3
                        sm:px-6">
          <div className="flex items-center gap-4">
            <p className="font-[family-name:var(--font-logo)] text-lg font-light tracking-[0.25em] uppercase text-white">
              Examengroep
            </p>
            <span className="hidden text-xs text-white/60
                             sm:inline">AI Workshops</span>
          </div>

          <Link
            href="/trainer"
            className="flex items-center gap-1.5 text-sm text-white/80 transition-colors
                       hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Trainer
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8
                       sm:px-6">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-[#1d4ed8]/10">
              <User className="size-6 text-[#1d4ed8]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {data.name}
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Huiswerk Sessie 1 · {data.email}
              </p>
            </div>
          </div>
          <Badge
            variant={filled >= HOMEWORK_TARGET_ENTRIES ? 'default' : 'secondary'}
            className={filled >= HOMEWORK_TARGET_ENTRIES ? 'bg-emerald-600' : ''}
          >
            {filled}/{HOMEWORK_TARGET_ENTRIES} ingevuld
          </Badge>
        </div>

        {filled === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center gap-2 py-12 text-center">
              <Home className="size-8 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">
                Nog geen huiswerk ingevuld
              </p>
              <p className="text-xs text-muted-foreground">
                {data.name.split(' ')[0]} heeft nog niets opgeslagen voor sessie 1.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {[1, 2, 3].map((num) => {
              const entry = data.entries.find((e) => e.entryNumber === num)
              const hasContent = entry && entry.promptUsed

              return (
                <Card
                  key={num}
                  className={hasContent ? '' : 'border-dashed opacity-60'}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Keer {num}</CardTitle>
                      {entry && usableBadge(entry.usable)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {hasContent ? (
                      <div className="space-y-4">
                        <Field
                          icon={MessageSquare}
                          label="Wat vroeg je aan Claude?"
                          value={entry.promptUsed}
                        />
                        <Field
                          icon={Sparkles}
                          label="Resultaat"
                          value={entry.result}
                        />
                        <Field
                          icon={Wrench}
                          label="Bijgestuurd?"
                          value={entry.adjusted}
                        />
                        <Field
                          icon={RefreshCw}
                          label="Volgende keer anders"
                          value={entry.nextTime}
                        />
                      </div>
                    ) : (
                      <p className="text-sm italic text-muted-foreground">
                        Niet ingevuld
                      </p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        <div className="mt-10 rounded-lg border bg-card p-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#1d4ed8]" />
            <p className="text-sm text-muted-foreground">
              Deelnemers kunnen hun huiswerk blijven aanvullen tot en met sessie 2.
              Ververs deze pagina vlak voor de start om de meest recente inzendingen te zien.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
