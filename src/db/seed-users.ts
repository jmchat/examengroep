export interface User {
  id: number
  email: string
  name: string
  role: 'participant' | 'trainer'
  title: string
  // Simple hash for in-memory auth — replace with bcrypt when DB is connected
  passwordHash: string
}

// Simple hash function for in-memory use only
// Will be replaced with bcrypt when Neon PostgreSQL is connected
function simpleHash(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return `simple_${hash.toString(36)}_${password.length}`
}

const DEFAULT_PASSWORD = 'examengroep2026'
const DEFAULT_HASH = simpleHash(DEFAULT_PASSWORD)

export const seedUsers: User[] = [
  {
    id: 1,
    email: 'esther@examengroep.nl',
    name: 'Esther Kessler',
    role: 'participant',
    title: 'Team- en examencoordinator',
    passwordHash: DEFAULT_HASH,
  },
  {
    id: 2,
    email: 'lisa@examengroep.nl',
    name: 'Lisa van Hees',
    role: 'participant',
    title: 'Examencoordinator EN/ES/DE',
    passwordHash: DEFAULT_HASH,
  },
  {
    id: 3,
    email: 'debbie@examengroep.nl',
    name: 'Debbie Brok',
    role: 'participant',
    title: 'Examenmedewerker',
    passwordHash: DEFAULT_HASH,
  },
  {
    id: 4,
    email: 'jeroen@examengroep.nl',
    name: 'Jeroen van Esch',
    role: 'participant',
    title: 'CEO',
    passwordHash: DEFAULT_HASH,
  },
  {
    id: 5,
    email: 'suzet@examengroep.nl',
    name: 'Suzet',
    role: 'participant',
    title: 'Freelancer examens',
    passwordHash: DEFAULT_HASH,
  },
  {
    id: 6,
    email: 'angela@examengroep.nl',
    name: 'Angela',
    role: 'participant',
    title: 'Nieuwe medewerker',
    passwordHash: DEFAULT_HASH,
  },
  {
    id: 7,
    email: 'joris@examengroep.nl',
    name: 'Joris',
    role: 'trainer',
    title: 'Trainer',
    passwordHash: DEFAULT_HASH,
  },
]

export { simpleHash }
