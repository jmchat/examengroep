export interface Exercise {
  id: string
  title: string
  duration?: string
  type: 'reference' | 'exercise' | 'homework' | 'placeholder'
  content: ExerciseContent
}

export interface ExerciseContent {
  intro?: string
  sections?: ContentSection[]
  table?: TableData
  steps?: Step[]
  tips?: TipItem[]
  suggestions?: Suggestion[]
  checklist?: string[]
  bonusTip?: string
}

export interface ContentSection {
  heading?: string
  text?: string
  example?: string
  feedbackPrompts?: string[]
}

export interface TableData {
  headers: string[]
  rows: string[][]
}

export interface Step {
  label: string
  description: string
  example?: string
}

export interface TipItem {
  situation: string
  response: string
}

export interface Suggestion {
  name: string
  ideas: string[]
}

export interface Workshop {
  id: number
  title: string
  date: string
  time: string
  description: string
  exercises: Exercise[]
}

export const workshops: Workshop[] = [
  {
    id: 1,
    title: 'AI begrijpen en zelf ervaren',
    date: 'Woensdag 8 april 2026',
    time: '09:00 - 12:00',
    description:
      'In deze eerste sessie leer je de basisprincipes van AI-prompting. Je oefent met het schrijven van goede prompts en past dit direct toe op je eigen werk.',
    exercises: [
      {
        id: 'hoe-werkt-ai',
        title: 'Hoe werkt AI?',
        type: 'reference',
        content: {
          intro:
            'Generatieve AI (zoals Claude) werkt door het voorspellen van het meest waarschijnlijke volgende woord. Simpel principe, verrassend krachtig resultaat.',
          sections: [
            {
              heading: 'Kernpunten',
              text: 'AI is getraind op enorme hoeveelheden tekst. Het is geen database die je doorzoekt, maar een model dat patronen herkent.\n\nAI "hallucineert" soms , het geeft altijd een antwoord, ook als het er eigenlijk geen heeft. Daarom is controleren essentieel.\n\nAI is een gereedschap, geen collega. Het denkt niet zelf na. Jij blijft de expert.\n\nHoe beter jouw instructie (prompt), hoe beter het resultaat.',
            },
            {
              heading: 'Waarom werken wij met Claude?',
              text: 'Er zijn meerdere AI-tools (ChatGPT, Gemini, Copilot). Wij werken met Claude van Anthropic, omdat:\n\n• Claude is sterk in lange, complexe teksten, ideaal voor examenmateriaal en documenten\n• Claude volgt instructies nauwkeuriger op, belangrijk als je met vaste formats werkt\n• Claude is voorzichtiger met "verzinnen", het geeft eerder aan als het iets niet weet',
            },
            {
              heading: 'Claude Cowork: je AI-werkplek',
              text: 'Cowork is de desktopomgeving van Claude. Hiermee kan Claude direct met je bestanden werken:\n\n• Upload een Word-document, Excel of PDF en laat Claude ermee aan de slag gaan\n• Claude kan documenten lezen, analyseren, herschrijven en nieuwe bestanden maken\n• Je werkt in een project-omgeving, Claude onthoudt de context van je gesprek\n• Alles blijft privé: jouw bestanden worden niet gebruikt om AI te trainen',
            },
          ],
          table: {
            headers: ['AI is goed in...', 'AI is (nog) niet goed in...'],
            rows: [
              ['Tekst herschrijven, samenvatten, vertalen', 'Feitelijke correctheid garanderen'],
              ['Meerkeuzevragen en afleiders genereren', 'Vakinhoudelijke beoordeling (examenvalidatie)'],
              ['Formats en consistentie controleren', 'Beeldmateriaal met tekst accuraat maken'],
              ['Brainstormen en formulering verbeteren', 'Complexe berekeningen of data-analyse'],
              ['Sjablonen en standaardteksten opstellen', 'Toegang tot jullie interne systemen (Remindo, Digiplein)'],
              ['Taalfouten en stijl checken', 'Autonome beslissingen nemen'],
            ],
          },
          bonusTip: 'De gouden regel: Vertrouw, maar verifieer. AI levert een eerste versie. Jouw expertise maakt het af. Controleer altijd het resultaat voordat je het gebruikt, vooral bij examens, contracten en communicatie naar buiten.',
        },
      },
      {
        id: 'spiekbriefje',
        title: 'Spiekbriefje: 5 bouwstenen van een goede prompt',
        type: 'reference',
        content: {
          intro:
            'Gebruik deze 5 bouwstenen om elke prompt te verbeteren. Hoe meer bouwstenen je gebruikt, hoe beter het resultaat.',
          table: {
            headers: ['#', 'Bouwsteen', 'Wat doe je?', 'Voorbeeld'],
            rows: [
              [
                '1',
                'Rol',
                'Geef Claude een perspectief',
                '"Je bent een ervaren examenontwikkelaar voor MBO-niveau 3"',
              ],
              [
                '2',
                'Taak',
                'Zeg precies wat je wilt',
                '"Schrijf een meerkeuzevraag met 4 antwoordopties"',
              ],
              [
                '3',
                'Context',
                'Geef achtergrondinformatie',
                '"Het examen is voor leerlingen die module X hebben afgerond"',
              ],
              [
                '4',
                'Format',
                'Beschrijf het gewenste resultaat',
                '"Geef het in een tabel: vraag, opties A-D, correct antwoord"',
              ],
              [
                '5',
                'Beperkingen',
                'Geef randvoorwaarden',
                '"Gebruik geen vakjargon dat niet in de lesstof voorkomt"',
              ],
            ],
          },
          checklist: [
            'Weet Claude wie het is? (Rol)',
            'Weet Claude wat het moet doen? (Taak)',
            'Weet Claude voor wie of waarvoor? (Context)',
            'Weet Claude hoe het resultaat eruit moet zien? (Format)',
            'Weet Claude wat er niet mag? (Beperkingen)',
          ],
          tips: [
            {
              situation: 'Resultaat te vaag',
              response:
                '"Wees specifieker. Geef concrete voorbeelden."',
            },
            {
              situation: 'Verkeerd niveau',
              response:
                '"Dit is te moeilijk/makkelijk voor niveau 3. Pas aan."',
            },
            {
              situation: 'Te lang',
              response: '"Maak het korter. Maximaal 3 zinnen."',
            },
            {
              situation: 'Verkeerde toon',
              response:
                '"Schrijf het formeler / informeler / zakelijker."',
            },
            {
              situation: 'Niet het juiste format',
              response:
                '"Gebruik dit format: [beschrijf of plak een voorbeeld]"',
            },
            {
              situation: 'Afleiders te zwak',
              response:
                '"De afleiders zijn te makkelijk te herkennen. Maak ze geloofwaardiger."',
            },
            {
              situation: 'Wil een andere aanpak',
              response:
                '"Probeer het opnieuw, maar dan vanuit [ander perspectief]."',
            },
          ],
        },
      },
      {
        id: 'oefening-1',
        title: 'Van slecht naar goed prompten',
        duration: '15 min',
        type: 'exercise',
        content: {
          intro:
            'In deze oefening vergelijk je het resultaat van een slechte prompt met een goede prompt. Je ziet direct het verschil dat de 5 bouwstenen maken.',
          steps: [
            {
              label: 'Stap 1: Type de slechte prompt',
              description:
                'Open Claude en type de volgende prompt:\n\n"Maak een examenvraag over voedselveiligheid"\n\nBekijk het resultaat. Wat valt je op? Wat ontbreekt er?',
              example: 'Maak een examenvraag over voedselveiligheid',
            },
            {
              label: 'Stap 2: Verbeter met de 5 bouwstenen',
              description:
                'Schrijf nu een verbeterde versie met zoveel mogelijk bouwstenen. Gebruik het spiekbriefje als hulp.',
              example:
                'Je bent een ervaren examenontwikkelaar voor MBO-niveau 3 richting Kok.\n\nSchrijf een meerkeuzevraag over voedselveiligheid, specifiek over temperatuurbeheersing bij het bewaren van bederfelijke producten.\n\nDe vraag is voor leerlingen die het blok "Hygiene en voedselveiligheid" hebben afgerond.\n\nGebruik dit format:\n- Vraagstam (1 zin)\n- 4 antwoordopties (A t/m D)\n- Markeer het juiste antwoord\n- Leg uit waarom de afleiders fout zijn\n\nBeperkingen:\n- Gebruik alleen terminologie uit de lesstof\n- De afleiders moeten geloofwaardig zijn voor iemand die niet goed heeft opgelet',
            },
            {
              label: 'Stap 3: Vergelijk de resultaten',
              description:
                'Leg de twee resultaten naast elkaar. Bespreek met je buurman/vrouw:\n- Welke is bruikbaarder?\n- Welke bouwstenen maakten het meeste verschil?\n- Wat zou je nog willen veranderen?',
            },
          ],
        },
      },
      {
        id: 'oefening-2',
        title: 'Iteratief verbeteren',
        duration: '20 min',
        type: 'exercise',
        content: {
          intro:
            'Neem het resultaat van oefening 1 en verbeter het in 3 rondes door Claude gerichte feedback te geven. Dit is hoe je in de praktijk met AI werkt: niet in een keer perfect, maar stap voor stap beter.',
          sections: [
            {
              heading: 'Ronde 1: Kwaliteit afleiders',
              text: 'Beoordeel de afleiders (foute antwoorden). Zijn ze geloofwaardig genoeg? Geef Claude feedback:',
              feedbackPrompts: [
                '"De afleiders zijn te makkelijk te herkennen. Optie C is duidelijk fout. Maak de afleiders geloofwaardiger door veelvoorkomende misvattingen van leerlingen te gebruiken."',
                '"Optie B klinkt te onrealistisch. Vervang deze door een antwoord dat bijna goed is, maar net een belangrijk detail mist."',
              ],
            },
            {
              heading: 'Ronde 2: Niveau aanpassen',
              text: 'Controleer of het niveau past bij MBO-3. Geef feedback:',
              feedbackPrompts: [
                '"De vraag is te makkelijk. Voeg een situatieschets toe waarin de leerling moet nadenken over wat het juiste antwoord is."',
                '"De vraag gebruikt vakjargon dat niet in de lesstof staat. Vereenvoudig de formulering maar behoud de moeilijkheidsgraad."',
              ],
            },
            {
              heading: 'Ronde 3: Format en stijl',
              text: 'Pas het format en de stijl aan voor gebruik in een echt examen:',
              feedbackPrompts: [
                '"Schrijf de vraag in de stijl van een casus. Begin met een korte situatiebeschrijving van 2-3 zinnen voordat je de vraag stelt."',
                '"Voeg een bronvermelding toe en maak het format geschikt om in Word te plakken."',
              ],
            },
          ],
          bonusTip:
            'Je kunt ook meerdere instructies tegelijk geven: "Verbeter de afleiders, maak het niveau geschikter voor MBO-3, en voeg een casusbeschrijving toe." Dit is efficienter als je al weet wat je wilt.',
        },
      },
      {
        id: 'oefening-3',
        title: 'Eigen werkcase',
        duration: '30 min',
        type: 'exercise',
        content: {
          intro:
            'Kies een taak uit je eigen werk en gebruik Claude om deze uit te voeren. Gebruik de 5 bouwstenen en de technieken uit oefeningen 1 en 2.',
          suggestions: [
            {
              name: 'Esther',
              ideas: [
                'Examenverantwoording controleren op volledigheid',
                'Samenwerkingsovereenkomst opstellen of verbeteren',
              ],
            },
            {
              name: 'Lisa',
              ideas: [
                'Examenstuk herschrijven in andere bewoordingen',
                'Tekst vertalen naar Engels, Spaans of Duits met behoud van vaktermen',
              ],
            },
            {
              name: 'Debbie',
              ideas: [
                'Meerkeuzevragen genereren bij een examenstuk',
                'Tekst controleren op taalfouten en consistentie',
              ],
            },
            {
              name: 'Jeroen',
              ideas: [
                'Brainstormen over strategische richting',
                'Communicatietekst herschrijven voor een andere doelgroep',
              ],
            },
            {
              name: 'Suzet',
              ideas: [
                'Examenvraag controleren op kwaliteit en volledigheid',
                'Validatiechecklist opstellen voor een examendossier',
              ],
            },
            {
              name: 'Angela',
              ideas: [
                'Vrije keuze: kies een taak uit je werk of iets wat je altijd al wilde uitproberen met AI',
              ],
            },
          ],
          steps: [
            {
              label: 'Stap 1: Kies je taak',
              description:
                'Kies een taak uit de suggesties hierboven, of bedenk er zelf een. Het werkt het best als je iets kiest dat je echt nodig hebt.',
            },
            {
              label: 'Stap 2: Schrijf je prompt',
              description:
                'Gebruik de 5 bouwstenen om een goede prompt te schrijven. Neem er de tijd voor.',
            },
            {
              label: 'Stap 3: Verbeter iteratief',
              description:
                'Geef Claude minstens 2 rondes feedback om het resultaat te verbeteren.',
            },
            {
              label: 'Stap 4: Beoordeel het resultaat',
              description:
                'Is het resultaat bruikbaar? Wat zou je anders doen? Bespreek het met de groep.',
            },
          ],
        },
      },
      {
        id: 'huiswerk',
        title: 'Huiswerk voor sessie 2',
        type: 'homework',
        content: {
          intro:
            'Gebruik Claude deze week minimaal 3 keer voor je werk. Houd je ervaringen bij in onderstaande tabel en neem je resultaten mee naar sessie 2.',
          table: {
            headers: [
              'Wat vroeg je?',
              'Resultaat?',
              'Bijgestuurd?',
              'Bruikbaar?',
              'Wat zou je anders doen?',
            ],
            rows: [
              ['', '', '', '', ''],
              ['', '', '', '', ''],
              ['', '', '', '', ''],
            ],
          },
          checklist: [
            'Gebruik Claude minimaal 3 keer deze week',
            'Vul de tabel in na elk gebruik',
            'Neem 1 voorbeeld mee naar sessie 2 om te bespreken',
            'Optioneel: neem een document mee dat je met Claude wilt verwerken in sessie 2',
          ],
        },
      },
    ],
  },
  {
    id: 2,
    title: 'AI toepassen op jullie werkprocessen',
    date: 'Woensdag 15 april 2026',
    time: '09:00 - 12:00',
    description:
      'In deze sessie passen we AI toe op concrete werkprocessen van Examengroep. We werken met examencontent en documenten.',
    exercises: [
      {
        id: 'blok-a',
        title: 'Blok A: AI voor examencontent',
        type: 'placeholder',
        content: {
          intro:
            'In dit blok leer je hoe je AI kunt inzetten voor het genereren en verbeteren van examenvragen.',
          checklist: [
            'Examenvragen genereren met Claude',
            'Iteratief verbeteren van vraagkwaliteit',
            'Meertalige examenvragen (EN/ES/DE)',
            'Kwaliteitscontrole met AI-ondersteuning',
          ],
        },
      },
      {
        id: 'blok-b',
        title: 'Blok B: AI voor documenten en workflows',
        type: 'placeholder',
        content: {
          intro:
            'In dit blok werk je met AI voor documentverwerking en het stroomlijnen van werkprocessen.',
          checklist: [
            'Contracten opstellen en controleren',
            'Documenten checken op volledigheid en consistentie',
            'Word-formatting en templates',
            'Workflow-automatisering met AI',
          ],
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Verdieping en borging',
    date: 'Woensdag 6 mei 2026',
    time: '09:00 - 12:00',
    description:
      'In de laatste sessie verdiepen we onze kennis en maken we een plan voor structureel AI-gebruik binnen Examengroep.',
    exercises: [
      {
        id: 'terugblik',
        title: 'Terugblik ervaringen',
        type: 'placeholder',
        content: {
          intro:
            'We bespreken de ervaringen van de afgelopen weken en delen wat wel en niet werkte.',
          checklist: [
            'Delen van successen en uitdagingen',
            'Bespreken van huiswerk en experimenten',
            'Patronen herkennen in effectief AI-gebruik',
          ],
        },
      },
      {
        id: 'geavanceerd',
        title: 'Geavanceerde prompt-technieken',
        type: 'placeholder',
        content: {
          intro:
            'We leren gevorderde technieken om nog meer uit AI te halen.',
          checklist: [
            'Chain-of-thought prompting',
            'Few-shot examples gebruiken',
            'Complexe taken opdelen',
            'Kwaliteitscontrole inbouwen in prompts',
          ],
        },
      },
      {
        id: 'automatisering',
        title: 'Automatiseringsmogelijkheden',
        type: 'placeholder',
        content: {
          intro:
            'Ontdek welke taken je (deels) kunt automatiseren met AI-tools.',
          checklist: [
            'Terugkerende taken identificeren',
            'Templates en herbruikbare prompts maken',
            'Integratie met bestaande tools',
            'Kosten-batenanalyse van AI-inzet',
          ],
        },
      },
      {
        id: 'actieplan',
        title: 'Actieplan opstellen',
        type: 'placeholder',
        content: {
          intro:
            'Samen stellen we een concreet actieplan op voor AI-gebruik binnen Examengroep.',
          checklist: [
            'Persoonlijke AI-doelen formuleren',
            'Team-afspraken over AI-gebruik',
            'Kennisdeling en ondersteuning organiseren',
            'Evaluatiemoment plannen',
          ],
        },
      },
    ],
  },
]

export function getWorkshop(id: number): Workshop | undefined {
  return workshops.find((w) => w.id === id)
}

export function getExerciseCount(workshopId: number): number {
  const workshop = getWorkshop(workshopId)
  if (!workshop) return 0
  return workshop.exercises.length
}
