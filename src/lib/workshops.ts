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
        id: 'spiekbriefje',
        title: 'Spiekbriefje: 5 bouwstenen van een goede prompt',
        type: 'reference',
        content: {
          intro:
            'Gebruik deze 5 bouwstenen om elke prompt te verbeteren. Hoe meer bouwstenen je gebruikt, hoe beter het resultaat.',
          table: {
            headers: ['#', 'Bouwsteen', 'Wat doe je?', 'Voorbeeld'],
            rows: [
              ['1', 'Rol', 'Geef Claude een perspectief', '"Je bent een ervaren examenontwikkelaar voor MBO-niveau 3"'],
              ['2', 'Taak', 'Zeg precies wat je wilt', '"Schrijf een meerkeuzevraag met 4 antwoordopties"'],
              ['3', 'Context', 'Geef achtergrondinformatie', '"Het examen is voor leerlingen die module X hebben afgerond"'],
              ['4', 'Format', 'Beschrijf het gewenste resultaat', '"Geef het in een tabel: vraag, opties A-D, correct antwoord"'],
              ['5', 'Beperkingen', 'Geef randvoorwaarden', '"Gebruik geen vakjargon dat niet in de lesstof voorkomt"'],
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
            { situation: 'Resultaat te vaag', response: '"Wees specifieker. Geef concrete voorbeelden."' },
            { situation: 'Verkeerd niveau', response: '"Dit is te moeilijk/makkelijk voor niveau 3. Pas aan."' },
            { situation: 'Te lang', response: '"Maak het korter. Maximaal 3 zinnen."' },
            { situation: 'Verkeerde toon', response: '"Schrijf het formeler / informeler / zakelijker."' },
            { situation: 'Niet het juiste format', response: '"Gebruik dit format: [beschrijf of plak een voorbeeld]"' },
            { situation: 'Afleiders te zwak', response: '"De afleiders zijn te makkelijk te herkennen. Maak ze geloofwaardiger."' },
            { situation: 'Wil een andere aanpak', response: '"Probeer het opnieuw, maar dan vanuit [ander perspectief]."' },
          ],
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
        id: 'claude-als-werkplek',
        title: 'Claude als werkplek: Projects, Connectors & Skills',
        type: 'reference',
        content: {
          intro:
            'In sessie 1 werkten we met losse gesprekken. Maar Claude kan veel meer: je kunt het inrichten als een echte werkplek met geheugen, toegang tot bestanden en herbruikbare instructies. Dit zijn de drie bouwstenen.',
          sections: [
            {
              heading: 'Projects: je AI-werkruimte',
              text: 'Een Project is een vaste werkruimte in Claude waar je context verzamelt.\n\n• Upload bestanden die Claude altijd kan raadplegen (huisstijlgids, examenkaders, sjablonen)\n• Voeg instructies toe die voor elk gesprek binnen het project gelden\n• Alle gesprekken binnen een project delen dezelfde context\n• Ideaal voor: een project per examenopleiding, of een project voor contractwerk',
            },
            {
              heading: 'Connectors: Claude koppelen aan je data',
              text: 'Met connectors geef je Claude toegang tot externe bronnen, zonder bestanden handmatig te uploaden.\n\n• Google Drive: Claude doorzoekt en leest documenten uit je Drive\n• Web search: Claude zoekt actuele informatie op internet\n• Code repositories: voor technische teams (niet relevant voor jullie)\n\nBelangrijk: connectors zijn beschikbaar in Claude Pro/Team. Ze worden per project ingeschakeld.',
            },
            {
              heading: 'Custom Instructions & Skills',
              text: 'Custom instructions zijn vaste aanwijzingen die Claude altijd volgt binnen een project.\n\n• Schrijf op hoe Claude zich moet gedragen: "Schrijf altijd op MBO-niveau 3"\n• Definieer vaste formats: "Gebruik altijd het Examengroep-vraagformat"\n• Stel beperkingen in: "Gebruik alleen terminologie uit de goedgekeurde begrippenlijst"\n• Dit vervangt het steeds opnieuw typen van dezelfde instructies',
            },
          ],
          table: {
            headers: ['Functie', 'Wat doet het?', 'Wanneer gebruiken?'],
            rows: [
              ['Project', 'Vaste werkruimte met gedeelde context en bestanden', 'Je werkt regelmatig aan hetzelfde onderwerp'],
              ['Bestanden uploaden', 'PDF, Word, Excel beschikbaar maken voor Claude', 'Je wilt dat Claude een specifiek document analyseert of gebruikt'],
              ['Google Drive connector', 'Claude doorzoekt je Drive automatisch', 'Je hebt veel documenten en wilt niet steeds uploaden'],
              ['Custom instructions', 'Vaste regels die Claude altijd volgt', 'Je wilt consistent output in een vast format of stijl'],
            ],
          },
          bonusTip:
            'Begin klein: maak een project aan voor je belangrijkste werkgebied, upload 2-3 kerndocumenten, en voeg 3 regels custom instructions toe. Bouw het daarna uit.',
        },
      },
      {
        id: 'blok-a',
        title: 'Blok A: AI voor examencontent',
        duration: '45 min',
        type: 'exercise',
        content: {
          intro:
            'In dit blok werk je met Claude aan echte examencontent. Je leert hoe je examenvragen genereert op basis van lesstof, ze iteratief verbetert, en vertaalt naar andere talen met behoud van vaktermen.',
          steps: [
            {
              label: 'Stap 1: Examendocument uploaden en analyseren',
              description:
                'Upload een examendocument, lesstof of examenkader naar Claude. Laat Claude de inhoud samenvatten en de belangrijkste thema\'s identificeren.',
              example:
                'Ik upload hierbij het examenkader voor [opleidingsnaam]. Analyseer dit document en geef me:\n1. De belangrijkste thema\'s en eindtermen\n2. Welke onderwerpen zich het best lenen voor meerkeuzevragen\n3. Eventuele hiaten of onduidelijkheden die je opvallen',
            },
            {
              label: 'Stap 2: Examenvragen genereren',
              description:
                'Laat Claude examenvragen genereren op basis van het geuploade document. Gebruik de 5 bouwstenen uit sessie 1.',
              example:
                'Genereer 3 meerkeuzevragen op MBO-niveau 3 over het thema [thema uit stap 1].\n\nGebruik dit format per vraag:\n- Situatieschets (2-3 zinnen)\n- Vraagstam\n- 4 antwoordopties (A t/m D)\n- Juiste antwoord + uitleg\n- Per afleider: waarom deze fout maar geloofwaardig is\n\nBaseer de vragen op de lesstof die ik heb geuploaded. Gebruik geen informatie die niet in het document staat.',
            },
            {
              label: 'Stap 3: Meertalig vertalen',
              description:
                'Laat Claude een examenvraag vertalen naar Engels, Spaans of Duits. Let op behoud van vaktermen en niveau.',
              example:
                'Vertaal de volgende examenvraag naar het Engels.\n\nBelangrijk:\n- Behoud de vaktermen (geef de Engelse equivalent, niet een vrije vertaling)\n- Houd hetzelfde niveau en moeilijkheidsgraad aan\n- Zorg dat de afleiders ook in het Engels geloofwaardig zijn\n- Geef na de vertaling een lijst van de gebruikte vaktermen: Nederlands → Engels',
            },
            {
              label: 'Stap 4: Kwaliteitscontrole door Claude',
              description:
                'Laat Claude zijn eigen werk reviewen. Dit is een krachtige techniek: vraag Claude om als criticus naar de vragen te kijken.',
              example:
                'Beoordeel de examenvragen die je zojuist hebt gemaakt op de volgende criteria:\n\n1. Zijn de afleiders geloofwaardig en niet te makkelijk te elimineren?\n2. Is het taalniveau passend voor MBO-3?\n3. Wordt er alleen getoetst wat in de lesstof staat?\n4. Zijn er meerdere interpretaties mogelijk van de vraagstam?\n5. Is het juiste antwoord ondubbelzinnig correct?\n\nGeef per vraag een score (1-5) en concrete verbeterpunten.',
            },
          ],
          tips: [
            { situation: 'Claude verzint feiten die niet in je document staan', response: '"Baseer je antwoord uitsluitend op het geuploade document. Als je iets niet kunt vinden, geef dat aan."' },
            { situation: 'De vragen zijn te makkelijk', response: '"Maak de vragen complexer door een situatieschets toe te voegen waarin de leerling moet redeneren, niet alleen herinneren."' },
            { situation: 'Vaktermen worden verkeerd vertaald', response: '"Gebruik voor [term] de vertaling [correcte vertaling]. Dit is de gangbare term in de internationale vakliteratuur."' },
            { situation: 'Je wilt meerdere varianten', response: '"Maak 3 varianten van deze vraag: zelfde eindterm, maar andere situatieschets en andere afleiders."' },
          ],
        },
      },
      {
        id: 'blok-b',
        title: 'Blok B: AI voor documenten en workflows',
        duration: '45 min',
        type: 'exercise',
        content: {
          intro:
            'In dit blok gebruik je Claude voor documentverwerking: contracten controleren, documenten opstellen, en herbruikbare templates maken. Je werkt met je eigen materiaal of met de voorbeelddocumenten.',
          steps: [
            {
              label: 'Stap 1: Document uploaden en laten analyseren',
              description:
                'Upload een contract, beleidsdocument of samenwerkingsovereenkomst. Laat Claude het analyseren op volledigheid, consistentie en mogelijke risico\'s.',
              example:
                'Ik upload hierbij een samenwerkingsovereenkomst. Analyseer dit document op:\n\n1. Volledigheid: ontbreken er standaardclausules?\n2. Consistentie: spreken bepalingen elkaar tegen?\n3. Risico\'s: welke bepalingen zijn ongunstig of onduidelijk?\n4. Taalgebruik: zijn er formuleringen die duidelijker kunnen?\n\nGeef je bevindingen in een tabel: bevinding | locatie in document | ernst (laag/midden/hoog) | suggestie',
            },
            {
              label: 'Stap 2: Document opstellen of verbeteren',
              description:
                'Laat Claude een nieuw document opstellen op basis van je input, of een bestaand document herschrijven.',
              example:
                'Stel een e-mail op voor examencommissieleden over de nieuwe procedure voor examenaanvragen.\n\nContext:\n- De procedure verandert per 1 juni 2026\n- Belangrijkste wijziging: digitale indiening via het portaal i.p.v. e-mail\n- Deadline voor de eerste ronde is 15 juni\n- Toon: professioneel maar toegankelijk\n\nFormat: korte e-mail, maximaal 200 woorden, met een opsomming van de 3 belangrijkste veranderingen.',
            },
            {
              label: 'Stap 3: Consistentie-check en vergelijking',
              description:
                'Upload twee versies van een document of twee gerelateerde documenten. Laat Claude de verschillen en inconsistenties vinden.',
              example:
                'Ik upload twee documenten: het examenreglement en de studiehandleiding.\n\nVergelijk deze documenten op:\n1. Tegenstrijdige informatie (bijv. verschillende deadlines of procedures)\n2. Informatie die in het ene document staat maar ontbreekt in het andere\n3. Verschillende terminologie voor hetzelfde begrip\n\nGeef de resultaten in een overzichtelijke tabel.',
            },
            {
              label: 'Stap 4: Template maken voor hergebruik',
              description:
                'Maak van je beste prompt een herbruikbaar template. Dit is de stap van "eenmalig handig" naar "structureel efficient".',
              example:
                'Maak van de prompt die we zojuist gebruikten een herbruikbaar template.\n\nHet template moet:\n- Duidelijke [INVULVELDEN] bevatten voor de variabele delen\n- Een korte instructie per invulveld\n- Een voorbeeld van een ingevuld template\n- Geschikt zijn om te delen met collega\'s die minder ervaring hebben met AI',
            },
          ],
          tips: [
            { situation: 'Claude mist context over jullie organisatie', response: '"Bij Examengroep werken we als volgt: [leg je werkwijze uit]. Houd hier rekening mee in je analyse."' },
            { situation: 'Het document is te lang voor een keer', response: '"Analyseer eerst pagina 1-10. Ik geef je daarna het vervolg." Of upload het als bestand in een Project.' },
            { situation: 'Je wilt een vast format aanhouden', response: 'Zet het format in de custom instructions van je project. Dan hoef je het niet elke keer te herhalen.' },
            { situation: 'Resultaat is te formeel of te informeel', response: '"Herschrijf dit in de toon van onze bestaande communicatie. Zie het geuploade voorbeeld als referentie."' },
          ],
        },
      },
      {
        id: 'huiswerk-2',
        title: 'Huiswerk voor sessie 3',
        type: 'homework',
        content: {
          intro:
            'Maak een eigen skill (herbruikbare instructieset) in je Claude Project. Een skill is een set custom instructions die Claude precies vertelt hoe hij een terugkerende taak moet uitvoeren, zodat je niet elke keer dezelfde prompt hoeft te schrijven.',
          checklist: [
            'Kies een terugkerende taak uit je werk (bijv. examenvragen reviewen, contracten checken, e-mails opstellen)',
            'Schrijf custom instructions voor deze taak in je Claude Project: welke rol, welk format, welke beperkingen',
            'Test je skill minimaal 3 keer met verschillende input',
            'Verbeter de instructions op basis van wat er misgaat of beter kan',
            'Deel je skill met een collega en vraag of het resultaat bruikbaar is',
            'Noteer wat wel en niet werkte, neem dit mee naar sessie 3',
          ],
          table: {
            headers: [
              'Welke skill?',
              'Welke taak automatiseert het?',
              'Hoe vaak getest?',
              'Resultaat consistent?',
              'Wat zou je verbeteren?',
            ],
            rows: [
              ['', '', '', '', ''],
              ['', '', '', '', ''],
              ['', '', '', '', ''],
            ],
          },
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Laat Claude jou interviewen',
    date: 'Woensdag 6 mei 2026',
    time: '09:00 - 12:00',
    description:
      'In de afsluitende sessie draaien we de prompting-mindset om: in plaats van vooraf alle context te bedenken, geef je Claude alleen een doel en laat je het jou interviewen tot alles op tafel ligt. We sluiten af met concrete borging-afspraken.',
    exercises: [
      {
        id: 'terugblik',
        title: 'Terugblik: wat werkte, wat niet?',
        duration: '20 min',
        type: 'exercise',
        content: {
          intro:
            'Korte ronde langs de groep. Iedereen deelt 1 succes en 1 obstakel uit de afgelopen weken. Daarna zoeken we patronen.',
          steps: [
            {
              label: 'Stap 1: Korte ronde (10 min)',
              description:
                'Ieder noemt:\n- Een taak waarvoor Claude goed werkte (en waarom)\n- Een taak waarbij het tegenviel (en wat er fout ging)',
            },
            {
              label: 'Stap 2: Patronen herkennen (10 min)',
              description:
                'We zoeken samen naar patronen:\n- Welk type taken leent zich goed voor AI?\n- Waar zit consistent ruis?\n- Welke prompt-bouwstenen kwamen het vaakst terug?',
            },
          ],
          bonusTip:
            'Schrijf je eigen learning op in 1 zin. Die zin pakken we straks terug bij het persoonlijke commitment.',
        },
      },
      {
        id: 'interview-techniek',
        title: 'De interview-techniek',
        type: 'reference',
        content: {
          intro:
            'In sessie 1 en 2 leerde je hoe je Claude een goede prompt geeft via de 5 bouwstenen. Probleem: je moet vooraf alles bedenken (rol, taak, context, format, beperkingen). Bij complexe taken weet je dat zelf niet altijd. De oplossing: draai het om. Geef Claude alleen een algemeen doel en laat Claude jou interviewen tot alle context op tafel ligt.',
          sections: [
            {
              heading: 'Waarom werkt dit zo goed?',
              text: 'Claude weet welke informatie nuttig is voor een goede output. Door jou te laten interviewen, haalt Claude context boven die jij anders zou vergeten.\n\nVoordelen:\n• Je hoeft niet vooraf alles uit te denken\n• Je krijgt vragen waar je zelf niet aan dacht\n• De output is bijna altijd specifieker en bruikbaarder\n• Het werkt ook als jij het onderwerp zelf nog niet helemaal scherp hebt',
            },
            {
              heading: 'Drie patronen die werken',
              text: '1. Eén vraag per keer (krachtigst)\n"Ik wil [doel]. Stel mij vragen om alle context te krijgen. Stel maximaal 1 vraag per keer en wacht op mijn antwoord voordat je doorgaat. Begin nu."\n\n2. Vaste set vragen\n"Voordat je deze taak uitvoert: stel me 5 vragen die je nodig hebt om dit goed te doen. Daarna voer je de taak uit."\n\n3. Iteratief met afsluitcheck\n"Interview me over deze taak tot je voldoende weet. Vraag aan het einde expliciet of je iets gemist hebt. Pas dan beginnen."',
            },
            {
              heading: 'Wanneer wel, wanneer niet?',
              text: 'Niet voor alles. Voor simpele taken (vertaal deze zin, vat dit samen) is een directe prompt sneller. Het loont vooral bij:\n\n• Complexe taken met veel context (examenverantwoording, beleidsstuk)\n• Taken waarbij jij nog zoekt wat je precies wilt\n• Output die sterk afhangt van doelgroep, niveau of format\n• Documenten waar veel verborgen aannames in zitten',
            },
          ],
          table: {
            headers: ['Klassieke prompt', 'Interview-prompt'],
            rows: [
              ['Jij denkt vooraf alles uit', 'Claude vraagt door tot het compleet is'],
              ['Risico: je vergeet iets cruciaals', 'Risico: het duurt iets langer'],
              ['Werkt voor heldere taken', 'Werkt voor diepe of complexe taken'],
              ['Een shot, dan corrigeren', 'Iteratief van begin af aan scherp'],
            ],
          },
          bonusTip:
            'Combineer beide werelden: gebruik de 5 bouwstenen om het algemene doel scherp te krijgen, en sluit af met "Stel mij vragen tot je genoeg context hebt om dit goed uit te voeren." Best of both.',
        },
      },
      {
        id: 'oefening-interview',
        title: 'Oefening: laat Claude jou interviewen',
        duration: '30 min',
        type: 'exercise',
        content: {
          intro:
            'We doen eerst klassikaal een demo, daarna oefen je zelf. Doel: voelen wat het verschil maakt als Claude doorvraagt.',
          steps: [
            {
              label: 'Stap 1: Klassikale demo (10 min)',
              description:
                'We doen samen op het scherm:\n\nDoel: een examenverantwoording opstellen voor een nieuw examenonderdeel.\n\nLet op welke vragen Claude stelt en welke jij zelf nooit had bedacht.',
              example:
                'Ik moet een examenverantwoording opstellen voor een nieuw examenonderdeel binnen een MBO-opleiding. Stel mij 1 vraag per keer tot je voldoende informatie hebt om de verantwoording op te stellen. Wacht steeds op mijn antwoord.',
            },
            {
              label: 'Stap 2: Zelf oefenen (15 min)',
              description:
                'Kies een eenvoudige eigen taak en laat Claude jou interviewen. Houd bij:\n- Welke vraag verraste je?\n- Welke vraag had jij zelf nooit bedacht?\n- Hoe was de eindoutput vergeleken met een directe prompt?',
            },
            {
              label: 'Stap 3: Korte uitwisseling (5 min)',
              description:
                'Een iemand deelt een goede ervaring, een iemand deelt waar het stroef ging. Wat leren we daaruit?',
            },
          ],
          tips: [
            { situation: 'Claude stelt te brede vragen', response: '"Stel concretere vragen die direct invloed hebben op het resultaat."' },
            { situation: 'Claude vraagt te veel achter elkaar', response: '"Stel maximaal 1 vraag per beurt en wacht op mijn antwoord."' },
            { situation: 'Claude wil te snel beginnen', response: '"Niet beginnen tot je zeker weet dat je geen cruciale info mist. Vraag of er nog iets ontbreekt."' },
            { situation: 'Vragen voelen oppervlakkig', response: '"Stel scherpere vragen, zoals een ervaren collega zou doen die kritisch meedenkt."' },
          ],
        },
      },
      {
        id: 'eigen-werkcase',
        title: 'Eigen werkcase via interview-techniek',
        duration: '45 min',
        type: 'exercise',
        content: {
          intro:
            'Pak een echte taak van je werkstapel. Geef Claude alleen een doel, en laat het interview je naar de output leiden.',
          suggestions: [
            {
              name: 'Esther',
              ideas: [
                'Examenverantwoording opstellen voor een nieuw onderdeel',
                'Samenwerkingsovereenkomst met externe partij doorlichten',
              ],
            },
            {
              name: 'Lisa',
              ideas: [
                'Examenstuk herschrijven naar andere doelgroep of taal',
                'Vertaling laten produceren met behoud van vaktermen',
              ],
            },
            {
              name: 'Debbie',
              ideas: [
                'Set meerkeuzevragen genereren bij een examenstuk',
                'Toetsmatrijs opstellen voor een nieuw examen',
              ],
            },
            {
              name: 'Jeroen',
              ideas: [
                'Strategiestuk uitwerken (positionering, jaarplan)',
                'Communicatie naar klanten herschrijven',
              ],
            },
            {
              name: 'Suzet',
              ideas: [
                'Validatiechecklist opstellen voor een examendossier',
                'Examenvraag-review doen via interview',
              ],
            },
            {
              name: 'Angela',
              ideas: [
                'Vrije keuze: pak iets uit je werk waar je vaak op vastloopt',
              ],
            },
          ],
          steps: [
            {
              label: 'Stap 1: Kies een taak (5 min)',
              description:
                'Iets waar je niet direct alle context paraat hebt. Hoe complexer, hoe sterker de techniek werkt.',
            },
            {
              label: 'Stap 2: Schrijf alleen het doel (5 min)',
              description:
                'Schrijf 2-3 zinnen waarin je het doel beschrijft. Geen format, geen rol, geen lange context. Sluit af met de interview-instructie.',
              example:
                'Ik wil [doel]. [Eventueel 1-2 zinnen context]. Stel mij 1 vraag per keer tot je voldoende informatie hebt om dit goed uit te voeren. Wacht steeds op mijn antwoord.',
            },
            {
              label: 'Stap 3: Doorloop het interview (20 min)',
              description:
                'Beantwoord de vragen rustig. Voeg gerust details toe die Claude niet vroeg maar wel relevant zijn. Eindig met: "Heb je nu voldoende context, of mis je nog iets?"',
            },
            {
              label: 'Stap 4: Laat Claude leveren en beoordeel (10 min)',
              description:
                'Vergelijk de output met wat je zonder interview zou hebben gekregen. Wat is beter? Wat zou je nog willen?',
            },
            {
              label: 'Stap 5: Bewaar de prompt (5 min)',
              description:
                'Werkte het goed? Sla de prompt op in onze gedeelde prompt-bibliotheek (zie volgend onderdeel) als template voor de volgende keer.',
            },
          ],
          bonusTip:
            'Voor terugkerende taken: gebruik de interview-techniek de eerste keer en sla de uiteindelijke "klassieke" prompt op die eruit kwam. De volgende keer hoef je niet meer geinterviewd te worden.',
        },
      },
      {
        id: 'borging',
        title: 'Borging: hoe houden we dit vol?',
        duration: '30 min',
        type: 'exercise',
        content: {
          intro:
            'Een training landt alleen als er afspraken zijn die het levend houden. Vier simpele rituelen die geen extra werk zijn maar wel het verschil maken.',
          sections: [
            {
              heading: '1. Gedeelde prompt-bibliotheek',
              text: 'We starten een gezamenlijk Word- of Notion-document waarin we werkende prompts verzamelen. Elke goede prompt die je tegenkomt gaat erin, met:\n- Doel\n- De prompt zelf\n- Voor wie of welk type taak\n- Wel of niet via interview tot stand gekomen',
            },
            {
              heading: '2. AI-buddy systeem',
              text: 'Iedereen krijgt een buddy. Loop je vast met een prompt? Stuur je buddy de eerste poging en het resultaat. Een tweede paar ogen voorkomt vastlopen.\n\nKoppels (in te vullen tijdens de sessie):\n- Esther / Suzet\n- Lisa / Debbie\n- Jeroen / Angela',
            },
            {
              heading: '3. Maandelijkse check-in (15 min)',
              text: 'Elke eerste woensdag van de maand, 15 minuten:\n- Wat werkte deze maand goed?\n- Waar liepen we vast?\n- 1 prompt om toe te voegen aan de bibliotheek\n\nGeen agenda, geen notulen, gewoon delen.',
            },
            {
              heading: '4. Persoonlijke commitment',
              text: 'Iedereen kiest 1 concrete commitment voor de komende maand:\n- Ik gebruik Claude minimaal X keer per week voor [taak]\n- Ik probeer de interview-techniek minstens 3 keer\n- Ik voeg 2 prompts toe aan onze bibliotheek',
            },
          ],
          checklist: [
            'Prompt-bibliotheek aangemaakt en eigenaar bepaald',
            'Buddy-koppels vastgelegd',
            'Datum eerste maandelijkse check-in geprikt',
            'Iedereen heeft 1 persoonlijke commitment opgeschreven',
          ],
        },
      },
      {
        id: 'spiekbriefje-interview',
        title: 'Spiekbriefje: interview-prompts',
        type: 'reference',
        content: {
          intro:
            'Bewaar dit spiekbriefje. Vijf patronen die je vandaag direct kunt inzetten.',
          table: {
            headers: ['Situatie', 'Interview-prompt'],
            rows: [
              ['Complexe taak, veel context', '"Ik wil [doel]. Stel mij 1 vraag per keer tot je voldoende info hebt. Wacht steeds op mijn antwoord."'],
              ['Korte taak, snel scherp krijgen', '"Voordat je begint: stel mij 5 vragen die je nodig hebt om dit goed te doen."'],
              ['Diepgaand, met afsluitcheck', '"Interview mij over deze taak. Vraag aan het einde of je iets gemist hebt voordat je begint."'],
              ['Onderwerp nog niet helder', '"Ik weet niet precies wat ik wil. Help me door door te vragen tot het scherp is."'],
              ['Combineren met bouwstenen', '"[Rol + algemeen doel]. Stel mij vragen om de specifieke context, doelgroep en format scherp te krijgen."'],
            ],
          },
          tips: [
            { situation: 'Geen interview nodig', response: 'Voor heldere, korte taken werkt een klassieke prompt sneller.' },
            { situation: 'Te lang interview', response: '"Stel alleen vragen die echt invloed hebben op het resultaat. Sla details over die je later kan invullen."' },
            { situation: 'Wil tussendoor stoppen', response: '"Voldoende. Begin met een eerste versie. Daarna pas ik bij waar nodig."' },
          ],
          bonusTip:
            'De gouden regel van sessie 3: bij twijfel, laat Claude vragen stellen. Het kost je 2 minuten extra en bespaart je een ronde van bijsturen achteraf.',
        },
      },
    ],
  },
]

// Unlock moment per workshop (ISO with explicit Amsterdam offset).
// Session 1: always unlocked. Sessions 2/3: unlock at 09:00 Europe/Amsterdam
// on their scheduled Wednesday. April and May 2026 are CEST (+02:00).
const workshopUnlockAt: Record<number, string> = {
  2: '2026-04-15T09:00:00+02:00',
  3: '2026-05-06T09:00:00+02:00',
}

export function getWorkshopUnlockDate(workshopId: number): Date | null {
  const iso = workshopUnlockAt[workshopId]
  return iso ? new Date(iso) : null
}

export function isWorkshopUnlocked(
  workshopId: number,
  role: 'participant' | 'trainer',
  now: Date = new Date()
): boolean {
  if (role === 'trainer') return true
  if (workshopId <= 1) return true
  const unlockAt = getWorkshopUnlockDate(workshopId)
  if (!unlockAt) return false
  return now.getTime() >= unlockAt.getTime()
}

export function getWorkshop(id: number): Workshop | undefined {
  return workshops.find((w) => w.id === id)
}

export function getExerciseCount(workshopId: number): number {
  const workshop = getWorkshop(workshopId)
  if (!workshop) return 0
  return workshop.exercises.length
}
