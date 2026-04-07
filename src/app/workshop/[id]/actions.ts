'use server'

import { getSession } from '@/lib/auth'
import { toggleProgress } from '@/lib/progress'
import { saveHomeworkEntry, type HomeworkEntry } from '@/lib/homework'

export async function toggleExerciseAction(
  workshopId: number,
  exerciseId: string
): Promise<boolean> {
  const user = await getSession()
  if (!user) return false
  return toggleProgress(user.id, workshopId, exerciseId)
}

export async function saveHomeworkAction(
  workshopId: number,
  entry: HomeworkEntry
): Promise<boolean> {
  const user = await getSession()
  if (!user) return false
  await saveHomeworkEntry(user.id, workshopId, entry)
  return true
}
