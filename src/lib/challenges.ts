export interface Challenge {
  slug: string
  name: string
  email: string
  difficulty: number
  steps: number
  icon: string
  color: string
  puzzle: string
  puzzleNote?: string
  hints: string[]
}

export const challenges: Challenge[] = [
  {
    slug: 'esther',
    name: 'Esther',
    email: 'esther@examengroep.nl',
    difficulty: 2,
    steps: 1,
    icon: 'Binary',
    color: 'bg-blue-600',
    puzzle: '4573746865723230323621',
    hints: [
      'Dit is geen willekeurige reeks. Elk teken is een hexadecimaal cijfer (0-9, a-f).',
      'Programmeurs gebruiken dit systeem om tekst op te slaan. Twee tekens = één karakter.',
    ],
  },
  {
    slug: 'lisa',
    name: 'Lisa',
    email: 'lisa@examengroep.nl',
    difficulty: 2,
    steps: 1,
    icon: 'Shuffle',
    color: 'bg-emerald-600',
    puzzle: 'Yvfn2026!',
    puzzleNote: 'Let op: de cijfers en het uitroepteken zijn NIET versleuteld, alleen de letters.',
    hints: [
      'Het alfabet is verschoven. A is niet meer A.',
      'Er is precies één verschuiving waarbij het alfabet perfect in twee helften splitst.',
    ],
  },
  {
    slug: 'debbie',
    name: 'Debbie',
    email: 'debbie@examengroep.nl',
    difficulty: 2,
    steps: 1,
    icon: 'Binary',
    color: 'bg-violet-600',
    puzzle: '01000100 01100101 01100010 01100010 01101001 01100101 00110010 00110000 00110010 00110110 00100001',
    hints: [
      'Computers denken in twee getallen. Dit is de taal van machines.',
      'Elke groep van 8 cijfers is één karakter.',
    ],
  },
  {
    slug: 'jeroen',
    name: 'Jeroen',
    email: 'jeroen@examengroep.nl',
    difficulty: 3,
    steps: 2,
    icon: 'Layers',
    color: 'bg-amber-600',
    puzzle: 'V3JlYnJhMjAyNiE=',
    puzzleNote: 'Waarschuwing: na de eerste decodering ben je er nog niet. Het resultaat moet nog een keer ontcijferd worden.',
    hints: [
      'Het = teken aan het einde is een veelvoorkomend kenmerk van een bepaald coderingssysteem.',
      'Na de eerste stap krijg je iets dat er bijna uitziet als een woord, maar net niet klopt. Dan begint puzzel twee.',
    ],
  },
  {
    slug: 'suzet',
    name: 'Suzet',
    email: 'suzet@examengroep.nl',
    difficulty: 3,
    steps: 2,
    icon: 'Radio',
    color: 'bg-rose-600',
    puzzle: 'Tango Echo Zulu Uniform Sierra',
    puzzleNote: 'Dit zijn 5 woorden. Samen vormen ze 5 letters. Maar de volgorde klopt niet. Voeg daarna het huidige jaar + ! toe.',
    hints: [
      'Piloten en militairen gebruiken dit systeem om letters duidelijk over de radio te communiceren.',
      'De letters die je krijgt staan in de verkeerde volgorde. Draai ze om.',
    ],
  },
  {
    slug: 'angela',
    name: 'Angela',
    email: 'angela@examengroep.nl',
    difficulty: 3,
    steps: 1,
    icon: 'Replace',
    color: 'bg-cyan-600',
    puzzle: 'Zmtvoz2026!',
    puzzleNote: 'De cijfers en het uitroepteken zijn NIET versleuteld. Alleen de letters zijn getransformeerd.',
    hints: [
      'In dit systeem is het alfabet gespiegeld: de eerste letter wordt de laatste, de tweede wordt de voorlaatste, enzovoort.',
      'A wordt Z, B wordt Y, C wordt X... en andersom.',
    ],
  },
]

export function getChallenge(slug: string): Challenge | undefined {
  return challenges.find((c) => c.slug === slug)
}
