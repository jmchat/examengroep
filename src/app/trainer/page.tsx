import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Clock,
  Coffee,
  Users,
  Presentation,
  PenTool,
  MessageSquare,
  Lightbulb,
  Briefcase,
  BookOpen,
  ExternalLink,
  User,
  AlertCircle,
} from 'lucide-react'

const schedule = [
  { time: '09:00 - 09:15', label: 'Opening & kennismaking', duration: '15 min', icon: Users },
  { time: '09:15 - 09:30', label: 'Wachtwoord challenge', duration: '15 min', icon: PenTool },
  { time: '09:30 - 09:45', label: 'Hoe werkt AI? (handout doorlopen)', duration: '15 min', icon: Presentation },
  { time: '09:45 - 10:00', label: 'Rondleiding Claude & Cowork', duration: '15 min', icon: Lightbulb },
  { time: '10:00 - 10:15', label: 'Pauze', duration: '15 min', icon: Coffee },
  { time: '10:15 - 11:00', label: 'Oefening 1 + 2 + bespreking', duration: '45 min', icon: BookOpen },
  { time: '11:00 - 11:30', label: 'Oefening 3: eigen werkcase', duration: '30 min', icon: Briefcase },
  { time: '11:30 - 11:45', label: 'Terugkoppeling oefening 3', duration: '15 min', icon: MessageSquare },
  { time: '11:45 - 12:00', label: 'Wrap-up + huiswerk uitleggen', duration: '15 min', icon: MessageSquare },
]

const participants = [
  {
    name: 'Esther Kessler',
    role: 'Team- en examencoordinator',
    experience: 'ChatGPT voor kennisexamens (vraagstelling, afleiders)',
    need: 'Contracten opstellen, formats controleren, taakoverzicht',
    note: 'Meest ervaren AI-gebruiker. Kan als voorbeeld dienen voor de groep. Uitdagen met geavanceerdere prompts.',
    level: 'experienced',
  },
  {
    name: 'Lisa van Hees',
    role: 'Examencoordinator EN/ES/DE',
    experience: 'ChatGPT voor formulering, examens maken ging moeizaam',
    need: 'Word-formats corrigeren, kwaliteitsbeheer',
    note: 'Heeft gemerkt dat AI-examens veel correctie nodig hebben, erken dit. Focus op meertaligheid kan haar motiveren.',
    level: 'intermediate',
  },
  {
    name: 'Debbie Brok',
    role: 'Examenmedewerker',
    experience: 'ChatGPT voor vragen, afleiders en afbeeldingen',
    need: 'Invoer Remindo automatiseren, nieuwsbrieven',
    note: 'Relatief nieuw (dec 2025). Experimenteert enthousiast maar met wisselend succes. Haar grootste frustratie (Remindo-invoer) valt buiten AI.',
    level: 'beginner',
  },
  {
    name: 'Jeroen van Esch',
    role: 'CEO',
    experience: 'Diverse AI-wensen aangeleverd',
    need: 'Examens genereren op basis van matrijzen, OKE-koppeling, formats',
    note: 'Als CEO meer geinteresseerd in strategisch beeld. Betrek hem bij "wat kan dit voor de organisatie betekenen"-momenten.',
    level: 'strategic',
  },
  {
    name: 'Suzet',
    role: 'Freelancer examens ontwikkeling/validatie',
    experience: 'Geen input ontvangen',
    need: 'n.t.b.',
    note: 'Geen vragenlijst ingevuld, startniveau onbekend. Betrek haar bij examencontent-demo\'s.',
    level: 'unknown',
  },
  {
    name: 'Angela',
    role: 'Nieuwe medewerker (per 1 juni, onder voorbehoud)',
    experience: 'Geen input ontvangen',
    need: 'n.t.b.',
    note: 'Komt alleen als ze vrij kan krijgen. Geef ruimte om te observeren en vragen te stellen.',
    level: 'unknown',
  },
]

function getLevelBadge(level: string) {
  switch (level) {
    case 'experienced':
      return <Badge variant="default" className="bg-emerald-600">Ervaren</Badge>
    case 'intermediate':
      return <Badge variant="default" className="bg-amber-600">Gemiddeld</Badge>
    case 'beginner':
      return <Badge variant="default" className="bg-sky-600">Beginner</Badge>
    case 'strategic':
      return <Badge variant="default" className="bg-violet-600">Strategisch</Badge>
    case 'unknown':
    default:
      return <Badge variant="secondary">Onbekend</Badge>
  }
}

export default async function TrainerPage() {
  const user = await getSession()
  if (!user) redirect('/login')
  if (user.role !== 'trainer') redirect('/dashboard')

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

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-white/80 transition-colors
                       hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Dashboard
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-8
                       sm:px-6">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Trainer Overzicht
          </h1>
          <p className="mt-1 text-muted-foreground">
            Sessie programma en deelnemersprofielen voor de workshop.
          </p>
        </div>

        {/* Section 1: Programma */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Clock className="size-5 text-[#9e1357]" />
            Programma Sessie 1
          </h2>

          <Card>
            <CardContent className="pt-2">
              <div className="divide-y divide-border">
                {schedule.map((item, index) => {
                  const Icon = item.icon
                  const isPause = item.label === 'Pauze'

                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-4 py-3 ${isPause ? 'bg-muted/50 -mx-4 px-4 rounded-lg' : ''}`}
                    >
                      <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${isPause ? 'bg-muted' : 'bg-[#9e1357]/10'}`}>
                        <Icon className={`size-4 ${isPause ? 'text-muted-foreground' : 'text-[#9e1357]'}`} />
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

        {/* Section 2: Deelnemersprofielen */}
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Users className="size-5 text-[#9e1357]" />
            Deelnemersprofielen
            <Badge variant="secondary" className="ml-1">{participants.length}</Badge>
          </h2>

          <div className="grid gap-4
                          md:grid-cols-2">
            {participants.map((participant) => (
              <Card key={participant.name} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-[#9e1357]/10">
                        <User className="size-5 text-[#9e1357]" />
                      </div>
                      <div>
                        <CardTitle>{participant.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{participant.role}</p>
                      </div>
                    </div>
                    {getLevelBadge(participant.level)}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {/* AI experience */}
                    <div>
                      <p className="mb-0.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        AI-ervaring
                      </p>
                      <p className="text-sm text-foreground">
                        {participant.experience}
                      </p>
                    </div>

                    {/* Biggest need */}
                    <div>
                      <p className="mb-0.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Behoefte
                      </p>
                      <p className="text-sm text-foreground">
                        {participant.need}
                      </p>
                    </div>

                    {/* Trainer notes */}
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                      <div className="mb-1 flex items-center gap-1.5">
                        <AlertCircle className="size-3.5 text-amber-600" />
                        <p className="text-xs font-medium text-amber-700">Let op</p>
                      </div>
                      <p className="text-sm text-amber-900">
                        {participant.note}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 3: Quick links */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
            <ExternalLink className="size-5 text-[#9e1357]" />
            Quick links
          </h2>

          <div className="grid gap-4
                          sm:grid-cols-2">
            <Link href="/challenge" className="group">
              <Card className="transition-shadow
                               hover:shadow-md">
                <CardContent className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#9e1357]/10">
                    <PenTool className="size-5 text-[#9e1357]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">Wachtwoord Challenge</p>
                    <p className="text-xs text-muted-foreground">Overzicht van de challenge</p>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground transition-colors
                                           group-hover:text-foreground" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/workshop/1" className="group">
              <Card className="transition-shadow
                               hover:shadow-md">
                <CardContent className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#9e1357]/10">
                    <BookOpen className="size-5 text-[#9e1357]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">Workshop Sessie 1</p>
                    <p className="text-xs text-muted-foreground">Bekijk de eerste workshop</p>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground transition-colors
                                           group-hover:text-foreground" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
