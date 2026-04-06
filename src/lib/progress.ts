import { cookies } from 'next/headers'

const PROGRESS_COOKIE = 'examengroep_progress'

export interface ProgressEntry {
  workshopId: number
  exerciseId: string
  completed: boolean
}

// Store progress in a cookie as JSON for now
// Will be replaced with DB queries when Neon is connected
export async function getProgress(userId: number): Promise<ProgressEntry[]> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(PROGRESS_COOKIE)?.value
  if (!raw) return []

  try {
    const all: Record<string, ProgressEntry[]> = JSON.parse(
      Buffer.from(raw, 'base64').toString()
    )
    return all[String(userId)] || []
  } catch {
    return []
  }
}

export async function toggleProgress(
  userId: number,
  workshopId: number,
  exerciseId: string
): Promise<boolean> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(PROGRESS_COOKIE)?.value
  let all: Record<string, ProgressEntry[]> = {}

  if (raw) {
    try {
      all = JSON.parse(Buffer.from(raw, 'base64').toString())
    } catch {
      all = {}
    }
  }

  const key = String(userId)
  if (!all[key]) all[key] = []

  const existing = all[key].find(
    (p) => p.workshopId === workshopId && p.exerciseId === exerciseId
  )

  if (existing) {
    existing.completed = !existing.completed
  } else {
    all[key].push({ workshopId, exerciseId, completed: true })
  }

  const newCompleted = existing ? existing.completed : true

  cookieStore.set(PROGRESS_COOKIE, Buffer.from(JSON.stringify(all)).toString('base64'), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 90, // 90 days
  })

  return newCompleted
}

export function getWorkshopProgress(
  progress: ProgressEntry[],
  workshopId: number,
  totalExercises: number
): { completed: number; total: number } {
  const completed = progress.filter(
    (p) => p.workshopId === workshopId && p.completed
  ).length
  return { completed, total: totalExercises }
}
